// Saves options to chrome.storage
function save_options() {
  var play = document.getElementById('play').value;
  var face = document.getElementById('face').value;
  chrome.storage.local.set({
    auto_play: play,
    face_reload: face
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = '设置已保存';
    console.log('play: ' + play);
    console.log('face: ' + face)
  });
};

// Restores select paly state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
    auto_play: "0",
    face_reload: "0"
  }, function(items) {
    document.getElementById('play').value = items.auto_play;
    document.getElementById('face').value = items.face_reload
  });
}


document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById('save').addEventListener('click', save_options);