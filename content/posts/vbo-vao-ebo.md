---
title: "The 'WHY' behind VBO, VAO, EBO in OpenGL"
date: 2025-12-07T12:00:00+00:00
draft: true
tags: ["opengl", "cpp"]
categories: ["rendering"]
---

# A Different Way to Think

## Prerequisites

I'm assuming that this is not your first technical blog. You've already programmed before in a language like C, C++, Java, or Python. If you've ever tried to learn OpenGL via the OG learnopengl.com or some other resource, you know how tough it is to get started and render your first triangle.

## Why am I Writing This?

{{< figure src="/vbo-vao-ebo-meme.jpg" width="350">}}
_My Genuine Reaction When I Read VBO, VAO, EBO for the 1st Time!_

After following the first couple of lessons in your OpenGL tutorial journey, you'd be able to draw a triangle on your screen. However, you may not fully understand what you're code is doing, or why you had to call the functions you called. I certainly felt this way when I started.

This blog should help you there. I have intentionally kept less code in this blog post because the focus of this article is on the **'why'** instead of the **'how'**.

## A Paradigm Shift

When working with OpenGL, or the GPU in general, you have to change the way you think. Normal programs run on the CPU and their data is stored in the RAM. In OpenGL, the program still runs on the CPU, but it needs to talk to your GPU, as that is the component responsible for drawing things on the screen.

The GPU manages a **Framebuffer**, which is essentially a complex canvas in memory that determines the color (and depth) of every pixel on your screen. But here is the _catch_: The CPU cannot touch the Framebuffer directly, and the GPU cannot read your RAM efficiently.

OpenGL acts as a coordinator between CPU and GPU. It takes the tringle's vertex data from RAM to VRAM, and then asks the GPU to draw it onto the frame buffer.

That's the journey we'll uncover here.

# Vertex Buffer Objects (VBO)

A **Vertex Buffer Object** is a raw block of memory allocated in VRAM (Video RAM), which is the GPU's memory. The GPU cannot get data from RAM directly. The data must exist in VRAM for the GPU to use it. Allocating a buffer using `glGenBuffers` can be thought of as `malloc` (in C), but it happens on the graphics card.

| In CPU World | In GPU World |
| ------------- | :------------- |
| `float *vertices = malloc(n * sizeof(float))` tells the CPU to allocate 12 bytes of memory in RAM. | `glGenBuffers(n, &bufferID)` tells the CPU to ask the GPU to allocate n buffers in VRAM. |
| `vertices[0] = 1.0f;` is how you normally write data. | In OpenGL, you'd use `glBufferData(...)` to write data to a buffer. |

*Technically*, `glGenBuffers` just creates a unique ID for your buffer. The actual memory allocation usually happens when you call `glBufferData`, which reserves the space and copies your data over.

### Why Can't I Just Draw After Setting Data In VBO?!

Consider these two code examples whose behaviors are similar:
```cpp
// In CPU world
struct Point { float x, y; };
struct Point p = { 1.0f, 0.5f };

// In GPU world
float data[] = { 1.0f, 0.5f };
unsigned int bufferID;
glGenBuffers(1, &bufferID);
glBindBuffer(GL_ARRAY_BUFFER, bufferID);  // Binding == Selecting
glBufferData(GL_ARRAY_BUFFER, 2 * sizeof(float), data, GL_STATIC_DRAW);
```
The data of variable `p` is stored in RAM. The RAM has no idea whether this data represents a position vertex or the face of Albert Einstein. The CPU is able to interpret the data stored in `p` because the entire program runs on the CPU and has the struct definition.

Similarly, in the GPU world, the data stored in the buffer is just a _"binary blob"_. The VRAM has no idea what the bytes in a vertex buffer represent. It could be a vertex's position, color, texture, or something else. The difference is that the GPU hardware (specifically the input fetcher) has no idea what they represent because it doesn't have your struct definitions. Cue, **Vertex Attributes**!

## Vertex Attributes

Vertex attributes tell GPU how to interpret the raw bytes stored in VBO. Imagine you have a `void*` pointer in C. To use it, you must cast it to an appropriate type, like `(float*)thePointer`. `glVertexAttribPointer` is that cast in OpenGL. You just need to understand what a _"Stride"_ and an _"Offset"_ is, in order to understand this.

Consider the following `data` array which contains data of 3 vertices. Each vertex has position and color values.
```cpp
float data[] = {
    // Positions         // Colors
    0.5f,  0.5f, 0.0f,   1.0f, 0.0f, 0.0f,
   -0.5f,  0.0f, 0.0f,   0.0f, 1.0f, 0.0f,
    0.0f, -0.5f, 0.0f,   1.0f, 0.0f, 1.0f,
};
```
This data will get stored interleaved in memory like this:
```
[x, y, z, r, g, b, x, y, z, r, g, b, x, y, z, r, g, b]
```

### Stride
How many bytes do I step forward to find the next vertex?
- For position, say you're at the 1st `x`. How many bytes must you move to get the 2nd `x`? Answer: `6 * 4 (size of each float) = 24 bytes`.

### Offset
Where does the attribute start?
- E.g. color starts `3 * 4 = 12 bytes` after position.

How do you actually define the vertex attribute? <br />
Try figuring that out yourself by looking at the doc [here](https://docs.gl/gl3/glVertexAttribPointer)! 🙂

Great, now we have the vertex data in a buffer in GPU's VRAM and we've specified how to interpret that data. Now we must be able to draw, right?

Well, not so fast. There's a final missing piece here. Setting up these attributes is a tedious process. Imagine having to do this every single time you draw. On `60fps`, that is once every `16.67ms`. The number of triangles in a AAA game's visible scene can easily be in millions. To render such a scene, you'd have to precisely bind all of their buffers and set all the vertex attributes every `16.67ms`! There's a lot more that you have to do in reality, but you get my point.

This is where **Vertex Array Objects** come in!

# Vertex Array Objects (VAO)

A **Vertex Array Object** allows OpenGL to *remember* your vertex attributes so that you don't have to define what the data in your VBO represents each time you wish to use it. It's as simple as that!

**Without VAO**

In the render loop, you'd need to
- Bind the VBO.
- Tell OpenGL how to interpret your VBO by defining vertex attributes.
- Draw.

**With VAO**

Before you reach the render loop, you'd need to
- Create VAO and bind it.
- Bind VBO and tell OpenGL how to read them.

Now, in the render loop, all you need to do is
- Bind VAO.
- Draw.

**Side Note:**  In case you're wondering why you need to "bind" a VAO before drawing, remember that OpenGL is a **State Machine**. If you don't bind a VAO, OpenGL does not know what to draw. Think of the VAO as a "Save File" that restores all your settings instantly.

In Modern OpenGL (Core Profile), VAOs are **mandatory**. If you try to draw without creating and binding at least one VAO, OpenGL will refuse to draw anything and you will likely get a black screen.

There's one final easy optimization that we can do when drawing triangles. Any object that comprises of triangles will have common edges between those triangles. If you define each triangle separately using its vertices data then you'd be duplicating data of all the vertices that are being shared by multiple triangles.

To draw a square using only triangles, you need 2 triangles. That's 6 vertices. But a square only has 4 unique corners. You are duplicating 2 vertices, i.e. 33% waste! It might not look a lot, but this can easily pile up. This is where EBO comes in!

# Element Buffer Object (EBO) / Index Buffer Object (IBO)

**Element Buffer Objects** (EBO), sometimes called **Index Buffer Objects** (IBO), are the solution to the data duplication problem we just identified.

Consider the following hexagon, which can be divided into 6 triangles.
```
    3---------2
   / \       / \
  /   \  B  /   \
 /  C  \   /  A  \
4------- 1 -------7
 \  D  /   \  F  /
  \   /  E  \   /
   \ /       \ /
    5---------6

(Vertices 2-7 are the rim, Vertex 1 is the center)
```
There are two ways of storing the information of these triangles.

**Without EBO**

We define each triangle separately. Since we have 6 triangles, we need 18 vertices total.

```
Triangle A: (0,0,0), (   1, 0,0), ( 0.5, 1,0)
Triangle B: (0,0,0), ( 0.5, 1,0), (-0.5, 1,0)
Triangle C: (0,0,0), (-0.5, 1,0), (  -1, 0,0)
Triangle D: (0,0,0), (  -1, 0,0), (-0.5,-1,0)
Triangle E: (0,0,0), (-0.5,-1,0), ( 0.5,-1,0)
Triangle F: (0,0,0), ( 0.5,-1,0), (   1, 0,0)

Total Vertices = 3 * 6 (triangles) = 18
Total Memory   = 18 * 3 (floats) * 4 (bytes)
               = 216 bytes
```

**With EBO**

We store only the Unique Vertices in the VBO, and then use a separate list of indices (int) to tell OpenGL which vertices to connect to form the various triangles.

```
Unique Vertices List (VBO):
1: (0,0,0)
2: (0.5,1,0)
3: (-0.5,1,0)
4: (-1,0,0)
5: (-0.5,-1,0)
6: (0.5,-1,0)
7: (1,0,0)

Indices List (EBO):
1, 7, 2  (Triangle A)
1, 2, 3  (Triangle B)
1, 3, 4  (Triangle C)
1, 4, 5  (Triangle D)
1, 5, 6  (Triangle E)
1, 6, 7  (Triangle F)

Total Vertices Memory = 7 * 3 (floats) * 4 (bytes) = 84 bytes
Total Indices Memory  = 18 * 4 (bytes)             = 72 bytes
Total Memory          = 84 + 72                    = 156 bytes
```
That's a saving of **~28%**!

**Why this matters:** The savings get significantly better when you add more data to your vertices. A real vertex often has a Position (12 bytes), Color (12 bytes), Normal (12 bytes), and Texture Coordinate (8 bytes) -> **44 bytes** total.
If you duplicate that 44-byte vertex, it hurts your VRAM. If you use an EBO, you only duplicate a tiny **4-byte** integer!

# Wrapping It Up

Hopefully, now you understand the OpenGL code you wrote while following a tutorial to draw a triangle. Remember that this isn't normal coding because in addition to writing code that runs on the CPU, you're also writing code that runs on the GPU.

**A Quick TL;DR**
- VBOs are just raw memory in GPU's VRAM.
- Vertex Attributes give that memory meaning.
- VAOs are used to save context of your data so you don't have to re-explain it to the GPU every frame.
- EBOs are used to re-use vertices and save memory.

Now go forth and render those triangles!
