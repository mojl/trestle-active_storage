Trestle.ready(function() {
  function init() {
    var fields = document.querySelectorAll(".active-storage__field");

    for (var i = 0; i < fields.length; i++) {
      attachEvents(fields[i]);
    }

    const grid = document.getElementById('stored_images');
    let draggedItem = null;

    grid.addEventListener('dragstart', (e) => {

        draggedItem = e.target;
        e.target.style.opacity = 0.9;
    });

    grid.addEventListener('dragend', (e) => {
        e.target.style.opacity = '';

        for (let i = 0; i < grid.children.length; i++) {
          let child = grid.children[i];
          child.querySelector(".order_image").value = i;
        }

        draggedItem = null;
    });

    grid.addEventListener('dragover', (e) => {
        e.preventDefault();
        const closest = document.elementFromPoint(e.clientX, e.clientY);
        const isGridItem = closest && closest.classList.contains('stored_image');
        if (isGridItem && closest !== draggedItem) {
            const bounding = closest.getBoundingClientRect();
            const offset = e.clientY - bounding.top + (e.clientX - bounding.left);
            if (offset > bounding.height + bounding.width / 2) {
                grid.insertBefore(draggedItem, closest.nextSibling);
            } else {
                grid.insertBefore(draggedItem, closest);
            }
        }
    });

    
  }

  function attachEvents(field) {
    var progressEl = field.parentNode.querySelectorAll(".progress")[0];
    var progressBarEl = field.parentNode.querySelectorAll(".progress-bar")[0];

    field.addEventListener("direct-upload:start", function(event) {
      progressEl.style = "display: block";
    });

    field.addEventListener("direct-upload:progress", function(event) {
      var detail = event.detail;
      progressBarEl.style = "width: " + detail.progress + "%";
    });
  }

  init();
});
