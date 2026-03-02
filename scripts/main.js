// Initialize Materialize components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidenav
    var sidenavElems = document.querySelectorAll('.sidenav');
    var sidenavInstances = M.Sidenav.init(sidenavElems);

    // Initialize dropdown
    var dropdownElems = document.querySelectorAll('.dropdown-trigger');
    var dropdownInstances = M.Dropdown.init(dropdownElems, {
        constrainWidth: false,
        coverTrigger: false
    });

    // Initialize tooltips
    var tooltipElems = document.querySelectorAll('.tooltipped');
    var tooltipInstances = M.Tooltip.init(tooltipElems);

    // Initialize collapsible
    var collapsibleElems = document.querySelectorAll('.collapsible');
    var collapsibleInstances = M.Collapsible.init(collapsibleElems);

    // Initialize modal
    var modalElems = document.querySelectorAll('.modal');
    var modalInstances = M.Modal.init(modalElems);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add fade-in animation to elements with .fade-in class
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });

        if (!isValid) {
            e.preventDefault();
            M.toast({html: 'Please fill in all required fields', classes: 'red'});
        }
    });
}

// Initialize form validation for all forms
document.querySelectorAll('form').forEach(form => {
    validateForm(form.id);
});

// Add active class to current navigation item
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-wrapper a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
}

// Call setActiveNavItem when DOM is loaded
document.addEventListener('DOMContentLoaded', setActiveNavItem);

// Course filtering functionality
function initializeCourseFilters() {
    const searchInput = document.getElementById('searchCourse');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const coursesGrid = document.getElementById('coursesGrid');

    if (!searchInput || !categoryFilter || !levelFilter || !coursesGrid) return;

    function filterCourses() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedLevel = levelFilter.value;

        const courseCards = coursesGrid.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-content p').textContent.toLowerCase();
            const level = card.querySelector('.course-badge').classList[1];
            const category = card.getAttribute('data-category') || '';

            const matchesSearch = title.includes(searchText) || description.includes(searchText);
            const matchesCategory = !selectedCategory || category === selectedCategory;
            const matchesLevel = !selectedLevel || level === selectedLevel;

            const parentCol = card.closest('.col');
            if (matchesSearch && matchesCategory && matchesLevel) {
                parentCol.style.display = '';
            } else {
                parentCol.style.display = 'none';
            }
        });
    }

    // Add event listeners for filtering
    searchInput.addEventListener('input', filterCourses);
    categoryFilter.addEventListener('change', filterCourses);
    levelFilter.addEventListener('change', filterCourses);
}

// Initialize course filters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCourseFilters();
});

// Calendar integration
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'Web Development Class',
                start: '2024-03-15T10:00:00',
                end: '2024-03-15T12:00:00',
                color: '#26a69a'
            },
            {
                title: 'Data Science Workshop',
                start: '2024-03-17T14:00:00',
                end: '2024-03-17T16:00:00',
                color: '#2196f3'
            },
            {
                title: 'Mobile Development Lab',
                start: '2024-03-20T11:00:00',
                end: '2024-03-20T13:00:00',
                color: '#f44336'
            }
        ],
        eventClick: function(info) {
            M.toast({html: `${info.event.title} - ${new Date(info.event.start).toLocaleTimeString()}`, classes: 'blue'});
        }
    });

    calendar.render();
}

// Progress tracking
function initializeProgressTracking() {
    const progressCards = document.querySelectorAll('.progress-card');
    
    progressCards.forEach(card => {
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('p:nth-of-type(1)');
        
        if (progressFill && progressText) {
            const progress = parseInt(progressText.textContent);
            progressFill.style.width = `${progress}%`;
            
            // Add color based on progress
            if (progress < 30) {
                progressFill.style.backgroundColor = '#f44336';
            } else if (progress < 70) {
                progressFill.style.backgroundColor = '#ff9800';
            } else {
                progressFill.style.backgroundColor = '#4caf50';
            }
        }
    });
}

// Activity tracking
function initializeActivityTracking() {
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        const timeText = item.querySelector('small');
        if (timeText) {
            const time = timeText.textContent;
            if (time.includes('hours ago')) {
                item.style.backgroundColor = '#e3f2fd';
            } else if (time.includes('days ago')) {
                item.style.backgroundColor = '#f5f5f5';
            }
        }
    });
}

// Initialize dashboard features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    initializeProgressTracking();
    initializeActivityTracking();
});

// Concept matching game
function initializeGame() {
    const gameData = [
        {
            concept: 'Variable',
            description: 'A container for storing data values'
        },
        {
            concept: 'Function',
            description: 'A block of code designed to perform a particular task'
        },
        {
            concept: 'Loop',
            description: 'A sequence of instructions that is repeated until a certain condition is reached'
        },
        {
            concept: 'Array',
            description: 'A special variable that can hold more than one value at a time'
        },
        {
            concept: 'Object',
            description: 'A collection of related properties and methods'
        }
    ];

    let selectedConcept = null;
    let selectedDescription = null;
    let matches = 0;
    let attempts = 0;

    function initGame() {
        const concepts = document.getElementById('concepts');
        const descriptions = document.getElementById('descriptions');

        if (!concepts || !descriptions) return;

        // Clear previous content
        concepts.innerHTML = '';
        descriptions.innerHTML = '';

        // Shuffle game data
        const shuffledData = [...gameData].sort(() => Math.random() - 0.5);

        // Add concepts
        shuffledData.forEach(item => {
            const conceptElement = document.createElement('a');
            conceptElement.className = 'collection-item concept-card';
            conceptElement.dataset.concept = item.concept;
            conceptElement.textContent = item.concept;
            conceptElement.addEventListener('click', () => selectConcept(conceptElement));
            concepts.appendChild(conceptElement);
        });

        // Add descriptions
        shuffledData.sort(() => Math.random() - 0.5).forEach(item => {
            const descriptionElement = document.createElement('a');
            descriptionElement.className = 'collection-item description-card';
            descriptionElement.dataset.concept = item.concept;
            descriptionElement.textContent = item.description;
            descriptionElement.addEventListener('click', () => selectDescription(descriptionElement));
            descriptions.appendChild(descriptionElement);
        });

        // Reset game state
        matches = 0;
        attempts = 0;
        updateStats();
        hideMessage();
    }

    function updateStats() {
        const matchCount = document.getElementById('matchCount');
        const attemptCount = document.getElementById('attemptCount');
        if (matchCount) matchCount.textContent = matches;
        if (attemptCount) attemptCount.textContent = attempts;
    }

    function showMessage(message, isSuccess) {
        const messageDiv = document.getElementById('gameMessage');
        if (!messageDiv) return;

        messageDiv.className = isSuccess ? 'success' : 'error';
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 2000);
    }

    function hideMessage() {
        const messageDiv = document.getElementById('gameMessage');
        if (messageDiv) messageDiv.style.display = 'none';
    }

    function selectConcept(element) {
        if (element.classList.contains('matched')) return;

        // Deselect previous selection
        const previousSelected = document.querySelector('.concept-card.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        element.classList.add('selected');
        selectedConcept = element;

        checkMatch();
    }

    function selectDescription(element) {
        if (element.classList.contains('matched')) return;

        // Deselect previous selection
        const previousSelected = document.querySelector('.description-card.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        element.classList.add('selected');
        selectedDescription = element;

        checkMatch();
    }

    function checkMatch() {
        if (!selectedConcept || !selectedDescription) return;

        attempts++;
        updateStats();

        if (selectedConcept.dataset.concept === selectedDescription.dataset.concept) {
            // Match found
            matches++;
            selectedConcept.classList.add('matched');
            selectedDescription.classList.add('matched');
            showMessage('Correct match!', true);

            if (matches === gameData.length) {
                showMessage('Congratulations! You completed the game!', true);
            }
        } else {
            // No match
            showMessage('Try again!', false);
        }

        // Reset selections
        selectedConcept.classList.remove('selected');
        selectedDescription.classList.remove('selected');
        selectedConcept = null;
        selectedDescription = null;
    }

    // Initialize game when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initGame();

        // Add reset button functionality
        const resetButton = document.getElementById('resetGame');
        if (resetButton) {
            resetButton.addEventListener('click', initGame);
        }
    });
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

// Form handling with jQuery
$(document).ready(function() {
    // Initialize Materialize form elements
    M.updateTextFields();
    $('textarea#message').characterCounter();

    // Form submission handling
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Animate form submission
        $(this).fadeOut(300, function() {
            // Show success message
            $('<div class="card-panel green lighten-4 green-text text-darken-4">')
                .text('Thank you for your message! We will get back to you soon.')
                .insertAfter(this)
                .hide()
                .fadeIn(300);

            // Reset form
            this.reset();
            M.updateTextFields();
            
            // Fade form back in after 3 seconds
            setTimeout(() => {
                $('.card-panel').fadeOut(300, function() {
                    $(this).remove();
                    $('#contactForm').fadeIn(300);
                });
            }, 3000);
        });
    });

    // Add animation to navigation items
    $('.nav-wrapper a').hover(
        function() {
            $(this).animate({ paddingLeft: '20px' }, 200);
        },
        function() {
            $(this).animate({ paddingLeft: '0' }, 200);
        }
    );

    // Add animation to course cards
    $('.course-card').hover(
        function() {
            $(this).animate({ 
                transform: 'translateY(-10px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }, 200);
        },
        function() {
            $(this).animate({ 
                transform: 'translateY(0)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }, 200);
        }
    );

    // Add animation to game cards
    $('.concept-card, .description-card').hover(
        function() {
            $(this).animate({ 
                transform: 'scale(1.05)',
                backgroundColor: '#e3f2fd'
            }, 200);
        },
        function() {
            if (!$(this).hasClass('selected') && !$(this).hasClass('matched')) {
                $(this).animate({ 
                    transform: 'scale(1)',
                    backgroundColor: '#fff'
                }, 200);
            }
        }
    );

    // Add animation to progress bars
    $('.progress-fill').each(function() {
        const width = $(this).css('width');
        $(this).css('width', '0').animate({
            width: width
        }, 1000);
    });

    // Add animation to activity items
    $('.activity-item').each(function(index) {
        $(this).hide().delay(index * 200).fadeIn(500);
    });
}); 