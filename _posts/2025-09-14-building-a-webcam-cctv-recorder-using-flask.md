---
layout: post
title: "Building a Webcam CCTV Recorder Using Flask"
date: 2025-09-14T04:05:26.000Z
author: jukomol
tags: ["Tech"]
github_issue: 13
cover: https://github.com/user-attachments/assets/e8b1a501-a59d-4101-af9b-17a98db7191e
featured: true
---

In this blog post, I walk you through the design and development of a lightweight CCTV system using a regular webcam and a Flask-based Python web app. This application serves live video through a web browser, records hourly footage automatically, and lets you view and download those recordings with ease.

---

### 💡 Key Features

* Live MJPEG stream from your webcam
* Automatic hourly recording with timestamped filenames
* Start and stop recording from the browser
* Explore saved recordings within the web interface
* Runs efficiently on Docker and compatible with Windows

---

### ⚙️ System Architecture

The app leverages Python’s threading to keep recording and streaming parallel. OpenCV handles camera input and frame encoding, while Flask powers the server and routes. I used a shared buffer protected by a lock to avoid conflicts between the stream and recorder.

---

### 📁 Recording Directory

All videos are saved in `static/recordings`. Each file is encoded using **MP4V at 30 FPS** and stored as a separate hour-long segment.

---

### 🧪 Challenges

* Proper threading to avoid deadlocks and broken feeds
* Ensuring clean start/stop toggling of the recording logic
* Docker compatibility and OpenCV camera device mapping

---

### 🚀 Dockerized Deployment

The app runs in a Docker container with access to `/dev/video0`. This makes it portable and easy to deploy on edge devices or remote systems.

---

### 📷 My Setup

```
Host: TUF GAMING FX504GE
OS: Windows 10 + WSL 2 (Docker)
Camera: Built-in HD Webcam
Python: 3.11
Libraries: Flask, OpenCV
```

You can find the full project on [[GitHub](https://github.com/jukomol/Webcam-CCTV-Recorder)](https://github.com/jukomol/Webcam-CCTV-Recorder).

---

*This post was generated from [GitHub Issue #13](https://github.com/jukomol/blogs/issues/13). You can view and comment on the original issue for discussions.*
