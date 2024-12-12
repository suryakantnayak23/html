document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.carousel-wrapper');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const dots = document.querySelectorAll('.dot');
    const itemCount = items.length;
    const centerIndex = Math.floor(itemCount / 2);
    
    function shiftLeft(arr) {
        return [...arr.slice(1), arr[0]];
    }

    function updateCarousel(clickedIndex) {
        const currentCenterIndex = items.findIndex(item => 
            parseInt(item.dataset.index) === parseInt(dots[centerIndex].dataset.index)
        );
        
        let newOrder = [...items];
        
        // Shift left until the clicked item is in the center
        while (parseInt(newOrder[centerIndex].dataset.index) !== clickedIndex) {
            newOrder = shiftLeft(newOrder);
        }
        
        // Update the DOM
        wrapper.innerHTML = '';
        newOrder.forEach((item, index) => {
            const newItem = item.cloneNode(true);
            if (index === centerIndex) {
                newItem.classList.add('active');
            } else {
                newItem.classList.remove('active');
            }
            wrapper.appendChild(newItem);
        });

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[clickedIndex].classList.add('active');

        // Reattach event listeners
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.addEventListener('click', () => {
                updateCarousel(parseInt(item.dataset.index));
            });
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                updateCarousel(parseInt(dot.dataset.index));
            });
        });
    }

    // Initial setup
    updateCarousel(0);
});