---
title: "The 'WHY' behind VBO, VAO, EBO in OpenGL"
date: 2025-12-07T12:00:00+00:00
draft: true
tags: ["opengl", "cpp"]
categories: ["rendering"]
---

# A Different Way to Think

## Prerequisites

I'm assuming that this is not your first technical blog. You've already programmed before in a language like C / C++ / Java / Python. If you've ever tried to learn OpenGL via the OG learnopengl.com or some other resource, you know how tough it is to get started and render your first triangle.

## Why am I Writing This?

After following the first couple of lessons in your OpenGL tutorial journey, you'd be able to draw a triangle on your screen. However, you may not fully understand what you're code is doing, or why you had to call the functions you called. I certainly felt this way when I started. This blog should help you there.

## A Paradigm Shift

When working with OpenGL or GPU in general, you have to change the way you think. Normal programs run on the CPU and their data is stored in the RAM. In OpenGL, the program still runs on the CPU, but it needs to talk to your GPU as that's responsible for drawing things on the screen. The GPU has a frame buffer which contains color of every pixel on your screen. Your OpenGL code to draw a triangle, takes the triangle's vertices and colors from RAM to the frame buffer. That's the journey we'll uncover here.

# Understanding Buffer Objects - VAO, VBO, EBO / IBO

Notes:
- As a programmer, you are accustomed to writing code for CPU and RAM. Things change a bit when you start writing code that's used by GPU. The goal of this blog is to make it very easy for you to understand not just how to work with GPU using openl, but why we're doing things the way we're doing!
- How writing opengl differs from writing a normal program like an http server:
  - An http server runs on the CPU
  - With OpenGL, code runs on CPU but the data needs to be in GPU.
  - Initially, data is in CPU (vertex data - position, colors, etc)
  - GPU needs to draw it, it can't read RAM directly. Data needs to go to GPU via a PCI express bridge
  - Sending data to GPU isn't super cheap. Send it once and then just issue commands like "draw the thing I sent you"
- Vertex Buffer Objects (VBO)
  - Raw block of memory on GPU.
  - It's like `malloc` or `new`, but on the VRAM (is that what its called?)
  - CPU: `float vertices[] = { ... }` - data lives in RAM
  - GPU: glGenBuffer, glCopy data - data now lives in VRAM
  - RAM is dumb, it doesn't know how to interpret the data you stored there. Your program knows that, which is on CPU. So we can't expect GPU to know how to interpret the data in VRAM. We need to tell it that.
  - Example, if you define in struct in C like `struct Vertex { float x, y, z };` and assign a memory address to a pointer of this struct, your program knows how to interpret the data because it has this struct. GPU doesn't have any struct like this for each VBO by default. And we can't possibly build one because vertex attributes can be very different from case to case -- you can have just position, or position + color + normals, etc.
  - How would GPU know how to interpret VBOs? Cue, "vertex attributes".
- Vertex Attributes
  - ... TODO - explain about vertex attributes while drawing similarities to it in CPU world.
  - Great, now we can set data in GPU's memory and explain what it means. Imagine having to do that every single time you draw -- on 60fps that's once every 16.67ms. The number of triangles in AAA games can easily be in the range of millions per visible scene. That means you need to copy over vbo data & set its vertex attributes millions of time every 16.67 ms. Computers are fast, but not THAT fast. Cue, VAO!
- Vertex Array Objects (VAO)
  - Allows OpenGL to remember how to interpret VBO data.
  - OpenGL abstracts all implementation of this. You don't have to do anything, just bind a VAO and then do all VBO stuff (bind VBO, set data, define attrs, etc.). Finally unbind the VAO.
  - When you wish to draw, just bind the VAO and OpenGL will know what VBOs you're interested in drawing and how to interpret their raw bytes.
  - Explain how VAO interprets a strip of memory via a diagram.
- Alright, everything seems nice now, but wait, if each object is built of triangles and we draw triangles separately then that means we're duplicating a lot of data because a lot of triangles would share edges.
- Show quick stats of how much duplication when we're talking about say a train object with 1000 triangles.
- Cue, EBO/IBO!
- Element / Index Buffer Object (EBO/IBO)
  - If you had to resolve the data duplicacy we talked about, how would you do it?
  - I would put all vertices of all triangles in an array and then use the indices of that array to define all edges of all triangles.
  - That's exactly what EBO does!
  - Give quick code example on how to use it
- Let's tie it all together and draw a train object!
  - Load the triangles from a file.
  - All opengl code.
  - basic shaders.
  - Call draw and BAM! there's the train.
  - It looks like a shadow of the train because of no lighting and shadows.
  - Use these quick shaders for that, and BAM! Let there be light!
