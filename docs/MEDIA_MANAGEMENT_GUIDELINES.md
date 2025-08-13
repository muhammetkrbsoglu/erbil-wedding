# MEDIA_MANAGEMENT_GUIDELINES.md

## 1. Philosophy: Offload and Optimize

All user-generated content (specifically, admin-uploaded salon photos and videos) will be stored and served via **ImageKit.io**. This service is chosen over a generic object store like AWS S3 because it combines storage with a powerful, on-the-fly media optimization and transformation API, which is critical for the performance of our media-heavy website.

## 2. Core Implementation Strategy: Secure Authenticated Uploads

We will **never** proxy file uploads through our NestJS backend. This is inefficient and unscalable. Instead, we will use the "Authenticated Upload" pattern:

1.  The Next.js frontend will request an authentication signature from our NestJS backend.
2.  The NestJS backend will use the ImageKit SDK and its private key to generate a short-lived, secure signature for the upload.
3.  The frontend will use this signature to upload the file directly from the user's browser to ImageKit's storage.

This pattern ensures our server is not a bottleneck, improves security, and enhances performance.

## 3. Step-by-Step Implementation Plan

### 3.1. Backend (NestJS `api` app)

1.  **Install SDK:** Install the official `imagekit-nodejs` SDK.
2.  **Create an `ImageKitModule`:**
    * This module will be responsible for initializing the ImageKit SDK with the required credentials (`publicKey`, `privateKey`, `urlEndpoint`) from environment variables.
    * Create an `ImageKitService`.
3.  **Create an Authentication Endpoint:**
    * In a new `UploadController`, create an endpoint like `GET /uploads/auth`.
    * This endpoint must be protected and require admin authentication (using the `ClerkAuthGuard`).
    * The corresponding service method will call `imagekit.getAuthenticationParameters()`. This returns a `signature`, `token`, and `expire` timestamp.
    * The controller will return these three values as a JSON response.

### 3.2. Frontend (Next.js `web` app)

1.  **Install SDK:** Install the official `imagekit-javascript` SDK.
2.  **Create an Uploader Component:**
    * This will be a Client Component, likely in the admin panel. It can use a library like `react-dropzone` for a better user experience.
    * When a file is selected, the component will make a `fetch` request to our backend's `/uploads/auth` endpoint to get the authentication parameters.
    * Using the received signature, token, and expire values, it will call the `imagekit.upload(...)` function from the JS SDK. The SDK will handle the direct upload to ImageKit.
3.  **Store the URL:**
    * Upon a successful upload, ImageKit's SDK returns a response containing the `url` and `fileId` of the uploaded media.
    * The frontend component will then make another request to our NestJS API (e.g., `POST /media`) to save this URL and other metadata into our PostgreSQL database, associating it with the correct `Salon`.

### 3.3. Displaying Optimized Images

When displaying images, we will leverage ImageKit's URL-based transformation parameters directly in the `src` attribute of our `<img>` tags (or the Next.js `<Image>` component).

* **Example:** To get a 400px wide, auto-height, quality-optimized version of an image:
    `<Image src="https://ik.imagekit.io/your_instance/path/to/image.jpg?tr=w-400,q-80" ... />`
* This ensures that we always serve the smallest possible image size for the required context, dramatically improving page load times.