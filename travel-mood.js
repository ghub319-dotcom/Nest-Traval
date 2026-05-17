// ============================================
// TRAVEL MOOD PAGE
// ============================================

const playingSounds = {
  beach: false,
  forest: false,
  city: false,
  rain: false,
  cafe: false,
  hill: false
};

let audioContext = null;
const soundNodes = {
  beach: null,
  forest: null,
  city: null,
  rain: null,
  cafe: null,
  hill: null
};

document.addEventListener('DOMContentLoaded', function() {
  loadTravelStatus();
  updateTravelStats();
});

// ============================================
// AMBIENT SOUND CONTROLS
// ============================================

function getAudioContext() {
  if (!audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

function createAmbientSound(type) {
  const ctx = getAudioContext();

  if (type === 'cafe') {
    const oscillator = ctx.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(220, ctx.currentTime);

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);

    const chatterGain = ctx.createGain();
    chatterGain.gain.setValueAtTime(0.08, ctx.currentTime);

    oscillator.connect(gainNode);
    noiseSource.connect(chatterGain).connect(filter).connect(gainNode);
    gainNode.connect(ctx.destination);

    return {
      source: oscillator,
      extraSource: noiseSource,
      gainNode,
      filter
    };
  }

  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    if (type === 'beach') {
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 0.45;
    } else if (type === 'forest') {
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 0.55;
    } else if (type === 'rain') {
      data[i] = (lastOut + 0.015 * white) / 1.015;
      lastOut = data[i];
      data[i] *= 0.5;
    } else if (type === 'hill') {
      const hillWind = Math.sin(i * 0.0012) * 0.12;
      data[i] = (white * 0.18) + hillWind;
    } else {
      data[i] = white * 0.25;
    }
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  const gainNode = ctx.createGain();

  if (type === 'beach') {
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
  } else if (type === 'forest') {
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.28, ctx.currentTime);
  } else if (type === 'rain') {
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    } else if (type === 'hill') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
  }

  source.connect(filter).connect(gainNode).connect(ctx.destination);

  return {
    source,
    gainNode,
    filter
  };
}

function stopSound(type) {
  const nodes = soundNodes[type];
  if (nodes) {
    ['source', 'extraSource'].forEach(nodeKey => {
      const node = nodes[nodeKey];
      if (node && typeof node.stop === 'function') {
        try {
          node.stop();
        } catch (error) {
          console.warn('Stopping sound failed:', error);
        }
      }
    });
  }
  soundNodes[type] = null;
  playingSounds[type] = false;
}

function toggleSound(soundType, button) {
  const label = button.querySelector('.sound-label');

  if (!label) {
    return;
  }

  ['beach', 'forest', 'city', 'rain', 'cafe', 'hill'].forEach(type => {
    if (type !== soundType) {
      stopSound(type);
      const otherButton = document.querySelector(`button[data-sound="${type}"]`);
      if (otherButton) {
        const otherLabel = otherButton.querySelector('.sound-label');
        if (otherLabel) otherLabel.textContent = 'Play Sound';
        otherButton.style.background = '';
      }
    }
  });

  if (playingSounds[soundType]) {
    stopSound(soundType);
    label.textContent = 'Play Sound';
    button.style.background = 'var(--primary-color)';
    return;
  }

  const ctx = getAudioContext();
  const nodes = createAmbientSound(soundType);
  soundNodes[soundType] = nodes;
  nodes.source.start();
  if (nodes.extraSource && typeof nodes.extraSource.start === 'function') {
    nodes.extraSource.start();
  }
  playingSounds[soundType] = true;
  label.textContent = 'Stop Sound';
  button.style.background = '#e74c3c';
}

// ============================================
// TRAVEL STATUS MANAGEMENT
// ============================================

function markAsPlanned() {
  const destination = document.getElementById('destination-status').value;

  if (!destination) {
    alert('Please select a destination');
    return;
  }

  let planned = loadFromLocalStorage('planned-destinations', []);

  // Check if already planned
  if (planned.some(d => d.name === destination)) {
    alert('This destination is already in your planned list!');
    return;
  }

  planned.push({
    name: destination,
    addedDate: new Date().toLocaleDateString()
  });

  saveToLocalStorage('planned-destinations', planned);
  alert('📋 Added to your planned destinations!');
  document.getElementById('destination-status').value = '';
  loadTravelStatus();
  updateTravelStats();
}

function markAsVisited() {
  const destination = document.getElementById('destination-status').value;

  if (!destination) {
    alert('Please select a destination');
    return;
  }

  let visited = loadFromLocalStorage('visited-destinations', []);

  // Check if already visited
  if (visited.some(d => d.name === destination)) {
    alert('You\'ve already marked this as visited!');
    return;
  }

  visited.push({
    name: destination,
    visitedDate: new Date().toLocaleDateString()
  });

  saveToLocalStorage('visited-destinations', visited);
  alert('✅ Great! Added to your visited destinations!');
  document.getElementById('destination-status').value = '';
  loadTravelStatus();
  updateTravelStats();
}

function loadTravelStatus() {
  const visited = loadFromLocalStorage('visited-destinations', []);
  const planned = loadFromLocalStorage('planned-destinations', []);

  // Load visited destinations
  const visitedList = document.getElementById('visited-list');
  if (visitedList) {
    if (visited.length === 0) {
      visitedList.innerHTML = '<p style="color: #999;">No destinations visited yet. Start your journey!</p>';
    } else {
      visitedList.innerHTML = '';
      visited.forEach((item, index) => {
        const li = document.createElement('div');
        li.style.background = '#d4edda';
        li.style.padding = '1rem';
        li.style.borderRadius = 'var(--border-radius)';
        li.style.marginBottom = '0.8rem';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        
        li.innerHTML = `
          <div>
            <h4 style="margin-bottom: 0.3rem; color: #155724;">✅ ${item.name}</h4>
            <p style="color: #666; font-size: 0.85rem;">Visited on ${item.visitedDate}</p>
          </div>
          <button class="btn btn-outline" onclick="removeVisited(${index})" style="white-space: nowrap;">Remove</button>
        `;
        visitedList.appendChild(li);
      });
    }
  }

  // Load planned destinations
  const plannedList = document.getElementById('planned-list');
  if (plannedList) {
    if (planned.length === 0) {
      plannedList.innerHTML = '<p style="color: #999;">No destinations planned yet. Add some to your bucket list!</p>';
    } else {
      plannedList.innerHTML = '';
      planned.forEach((item, index) => {
        const li = document.createElement('div');
        li.style.background = '#d1ecf1';
        li.style.padding = '1rem';
        li.style.borderRadius = 'var(--border-radius)';
        li.style.marginBottom = '0.8rem';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        
        li.innerHTML = `
          <div>
            <h4 style="margin-bottom: 0.3rem; color: #0c5460;">📋 ${item.name}</h4>
            <p style="color: #666; font-size: 0.85rem;">Added on ${item.addedDate}</p>
          </div>
          <button class="btn btn-outline" onclick="removePlanned(${index})" style="white-space: nowrap;">Remove</button>
        `;
        plannedList.appendChild(li);
      });
    }
  }
}

function removeVisited(index) {
  let visited = loadFromLocalStorage('visited-destinations', []);
  visited.splice(index, 1);
  saveToLocalStorage('visited-destinations', visited);
  loadTravelStatus();
  updateTravelStats();
}

function removePlanned(index) {
  let planned = loadFromLocalStorage('planned-destinations', []);
  planned.splice(index, 1);
  saveToLocalStorage('planned-destinations', planned);
  loadTravelStatus();
  updateTravelStats();
}

// ============================================
// TRAVEL STATISTICS
// ============================================

function updateTravelStats() {
  const visited = loadFromLocalStorage('visited-destinations', []);
  const planned = loadFromLocalStorage('planned-destinations', []);

  document.getElementById('visited-count').textContent = visited.length;
  document.getElementById('planned-count').textContent = planned.length;
}
