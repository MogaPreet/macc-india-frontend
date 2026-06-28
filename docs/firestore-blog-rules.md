# Firestore Security Rules — Blogs Collection

Apply these rules in the **Firebase Console** under Firestore → Rules.
Merge with your existing rules for other collections.

## Requirements

- **Public read** for published blog posts only (storefront SEO pages)
- **Authenticated admin write** for create/update/delete (Flutter admin portal)

## Suggested rules snippet

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ... your existing collection rules ...

    match /blogs/{blogId} {
      // SEO pages: anyone can read published posts
      allow read: if resource.data.isPublished == true;

      // Admin dashboard: authenticated users can manage all blog docs
      // (Admin app uses Firebase Auth + email allowlist in the Flutter app)
      allow create, update, delete: if request.auth != null;

      // Optional: allow admins to read drafts while editing in dashboard
      allow read: if request.auth != null;
    }
  }
}
```

## Notes

- The Next.js storefront queries `blogs` with `where('isPublished', '==', true)` and by `slug`.
- Draft posts (`isPublished: false`) must not be readable by unauthenticated clients.
- If you use a stricter admin model (e.g. custom claims or `admin_users` collection), replace `request.auth != null` with your existing admin check pattern.
- Create a composite index only if you add `orderBy('publishedAt')` in Firestore queries; current implementation sorts in memory after fetch.

## Storage rules (cover images)

Allow public read for blog cover images under `blogs/images/`:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blogs/images/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
