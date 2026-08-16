# Login and Team Page Testing

**Tester:** Hung Le Hoang Thanh  
**Role:** Dev 2  
**Date:** 16 August 2026  
**Deployed site:** https://pp-1-boilerplate-feature-frontend.vercel.app/

## Results

| Test | Result | Notes |
|---|---|---|
| Valid login | Pass | Login succeeded using a valid account |
| Redirect after login | Pass | User was redirected into the authenticated area |
| Team page | Pass with issues | Names, roles and blurbs are displayed |
| Invalid login | Pass | Incorrect password was rejected with an error message |
| Direct access without login | Pass | Direct access to `/team` redirected to `/auth/signin` |
| Missing photos | Pass with issue | Initials are displayed without breaking the layout, but actual member photos are missing |
| Blurb layout | Pass | Multi-line blurbs wrapped without overflowing the cards |

## Issues found

1. The Dashboard does not have a visible link to the Team page.
2. Team-member photos are missing and have been replaced with initials.
3. The requested team video is not currently displayed on the Team page.

## Evidence

The tests were completed manually against the deployed Vercel website. Screenshots were taken for the valid login, invalid login, Team page and unauthenticated redirect.
