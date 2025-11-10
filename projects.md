---
layout: single
title: "Projects"
permalink: /projects/
author_profile: true
---

# My Projects

Here are some of the projects I've worked on:

{% for project in site.projects %}
  <article>
    <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
    <p>{{ project.excerpt }}</p>
  </article>
{% endfor %}
