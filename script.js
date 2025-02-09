let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 10 - 5; // Slight tilt (5 to -5 degrees)
    this.originalRotation = this.rotation;
    this.rotating = false;

    this.init();
  }

  init() {
    this.paper.style.transform = `rotateZ(${this.rotation}deg)`;
    this.paper.addEventListener('mousedown', this.startMove.bind(this));
    this.paper.addEventListener('touchstart', this.startMove.bind(this));
    document.addEventListener('mousemove', this.move.bind(this));
    document.addEventListener('touchmove', this.move.bind(this), { passive: false });
    document.addEventListener('mouseup', this.endMove.bind(this));
    document.addEventListener('touchend', this.endMove.bind(this));
  }

  startMove(e) {
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(0deg)`; // Make straight
    
    const touch = e.touches ? e.touches[0] : e;
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.prevTouchX = this.touchStartX;
    this.prevTouchY = this.touchStartY;
  }

  move(e) {
    if (!this.holdingPaper) return;
    
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    
    this.velX = touch.clientX - this.prevTouchX;
    this.velY = touch.clientY - this.prevTouchY;
    
    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;
    
    this.prevTouchX = touch.clientX;
    this.prevTouchY = touch.clientY;

    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(0deg)`; // Keep straight while dragging
  }

  endMove() {
    this.holdingPaper = false;
    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.originalRotation}deg)`; // Slight tilt back
  }
}

document.querySelectorAll('.paper').forEach(paper => new Paper(paper));
