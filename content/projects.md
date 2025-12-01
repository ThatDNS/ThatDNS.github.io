---
title: "Projects"
layout: "page"
url: "/projects/"
summary: "My Projects"
---

👋 _**Greetings Traveller**_! 🧙🏻‍♂️ <br />
You've landed on the fun side of this website. 😃

Here, you'll find a collection of projects (let's be honest, just games 🎮) that have challenged me, entertained me, and taught me something new along the way! Each project is a labor of love, blending code, creativity, and the occasional late-night bug fix 🐛☕.

I hope you enjoy exploring these creations as much as I enjoyed building them. ✨

---

{{< icons >}}

## Shatter Space

<div class="project-content-wrapper">
  <div class="project-description">
    <p>This game was made purely in C++ as part of Ubisoft Next 2023-24 programming challenge. In this game you're going through space & smashing glass! Fun, right?! This game is heavily inspired by Smash Hit.</p>
    <strong>Starting Point:</strong> Ubisoft gave an API to draw a line between 2 points in 2D. <br />
    <strong>End Result:</strong> I used the 2D line drawing API to create a 3D game, as you can see in the GIF.
  </div>
  <div class="project-buttons">
    <a href="https://github.com/ThatDNS/Shatter-Space" target="_blank" rel="noopener noreferrer" class="project-button">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><use href="#github"></use></svg>
      GitHub
    </a>
    <a href="https://www.youtube.com/watch?v=wRBW8m4EhoU" target="_blank" rel="noopener noreferrer" class="project-button">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><use href="#youtube"></use></svg>
      YouTube
    </a>
    <a href="https://github.com/ThatDNS/Shatter-Space/releases/download/v1.0/ShatterSpace.zip" target="_blank" rel="noopener noreferrer" class="project-button">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><use href="#windows"></use></svg>
      Download (.zip)
    </a>
  </div>
</div>

**Salient features:**
- ECS-based game engine using entity archetypes and object pooling to boost cache performance.
- Math library with 3D-to-2D projection matrices and `O(log n)` BVH tree collision detection.
- High-efficiency physics simulation system capable of real-time rendering of `>10,000` objects.

<div class="feature-grid">
  <div class="feature-card" style="max-width: 500px;">
    <figure>
      <img src="/images/projects/shatter_space.gif" alt="Shatter Space Gameplay">
      <figcaption>3D Space Flight and Glass Shattering Mechanics</figcaption>
    </figure>
  </div>
</div>

---

## Slime Hunter

<div class="project-content-wrapper">
  <div class="project-description">
    <p>A 3D open-world action RPG game built with Unity. I worked on this game in a team of 5 people (2 programmers, 2 designers, 1 artist) as part of my final semester project at Sheridan College.</p>
  </div>
  
  <div class="project-buttons">
    <a href="https://github.com/Studio-Bounce/slime-hunter" target="_blank" rel="noopener noreferrer" class="project-button">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><use href="#github"></use></svg>
      GitHub
    </a>
  </div>
</div>

This game wouldn't have been possible without the valuable contributions of my talented teammates, namely Roy Lu, Sagar Jadhav, Riccio Li, and Connor Switzer.

**My Main Contributions:** Developed Slime AI with FSM, engineered Quest/NPC dialogue system using Ink, created secure Persistence System, and built Navigation System for quest guidance.

<div class="feature-grid">
  <div class="feature-card">
    <figure>
      <img src="/images/projects/slime_main_city_hub.png" alt="Main City Hub">
      <figcaption>Main City Hub</figcaption>
    </figure>
  </div>
  <div class="feature-card">
    <figure>
      <img src="/images/projects/slime_main_menu.png" alt="Main Menu">
      <figcaption>Main Menu</figcaption>
    </figure>
  </div>
</div>

---

## Helicopter Neuroevolution

<div class="project-content-wrapper">
  <div class="project-description">
    <p>There's an old game called Helicopter that I used to play as I kid. It was really tough! You can play it online here: <a href="https://www.addictinggames.com/clicker/helicopter-game" target="_blank" rel="noopener noreferrer">Helicopter Game | Addicting Games</a></p>
  </div>
  <div class="project-buttons">
    <a href="https://github.com/ThatDNS/Helicopter-AI" target="_blank" rel="noopener noreferrer" class="project-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><use href="#github"></use></svg>
        GitHub
    </a>
  </div>
</div>

As a kid, I always wanted to get really good at this game. As an adult, I realize that it's easier to just train an AI to do it!

I found on Youtube that someone scored 16,758 on this game. Well, not to brag, but my AI can score more than 500,000 🙂

This game was created using p5.js and trained using Genetic Neuroevolution.

The neural network I designed for this game had `10` inputs, `1` hidden layer with `12` nodes, and `2` outputs.

<div class="feature-grid">
  <div class="feature-card">
    <figure>
      <img src="/images/projects/helicopter-1.gif" alt="Neural Network Training">
      <figcaption>Neural Network Training</figcaption>
    </figure>
  </div>
  <div class="feature-card">
    <figure>
      <img src="/images/projects/helicopter-2.gif" alt="Final Result - AI Playing">
      <figcaption>Final Result - AI Playing</figcaption>
    </figure>
  </div>
</div>

---

## Tetris Neuroevolution

<div class="project-content-wrapper">
  <div class="project-description">
    <p>I designed & developed a replica of the famous puzzle video game, Tetris. After playing it for a while, I realized that I was bad it at.</p>
  </div>
  <div class="project-buttons">
    <a href="https://github.com/ThatDNS/Tetris-AI" target="_blank" rel="noopener noreferrer" class="project-button">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><use href="#github"></use></svg>
      GitHub
    </a>
  </div>
</div>

So, I implemented and trained a Neural Network to play it using Genetic Neuroevolution! The AI was able to achieve a score 10x better than my best attempt!

This game was created using p5.js and trained using Genetic Neuroevolution.

The neural network I designed for this game had 5 inputs, 1 hidden layer with 6 nodes, and 1 output.

<div class="feature-grid">
  <div class="feature-card">
    <figure>
      <img src="/images/projects/tetris-1.gif" alt="Tetris Gameplay">
      <figcaption>Tetris Gameplay</figcaption>
    </figure>
  </div>
  <div class="feature-card">
    <figure>
      <img src="/images/projects/tetris-2.gif" alt="Neural Network Training">
      <figcaption>Neural Network Training</figcaption>
    </figure>
  </div>
  <div class="feature-card">
    <figure>
      <img src="/images/projects/tetris-3.gif" alt="AI Playing Tetris">
      <figcaption>AI Playing Tetris</figcaption>
    </figure>
  </div>
</div>

---
