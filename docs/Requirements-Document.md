**Sprint Requirements Document**

Prepared by: Darko Petkovic

# 1. Overview

The sprint delivers a single feature: a styled login page that, on
successful authentication, leads into a Team page displaying the team
name and each member's photo, name, role, and a short blurb. The feature
builds on the project's existing boilerplate and uses Bootstrap for
styling.

# 2. Purpose & Goals

- Give the login experience a polished, consistent look using Bootstrap.

- Give users a clear, immediate destination after login: a Team page
  introducing who's behind the project.

- Reuse the existing boilerplate's routing/auth scaffolding rather than
  building new infrastructure.

- Practice sprint-based requirements gathering, estimation, and delivery
  as a team exercise.

# 3. Scope

## 3.1 In Scope

- Restyling the existing login page's HTML/CSS using Bootstrap
  components and classes.

- Redirecting a successfully authenticated user to a new Team page.

- Building the Team page: team name, and each member's photo, name,
  role, and short blurb.

- Responsive styling for both pages, built on top of the existing
  boilerplate.

## 3.2 Out of Scope

- Any changes to backend authentication logic, session handling, or the
  database beyond the boilerplate's existing setup.

- New user roles, permissions, or account management features.

# 4. Functional Requirements

## 4.1 Login Page

**Scope note:** the login page is styling-only for this sprint. No
changes are made to the boilerplate's authentication logic, session
handling, password checking, or backend endpoints — only the markup,
CSS/Bootstrap classes, and the post-login redirect target change.

| **ID** | **Requirement**                                                                                                                           | **Priority** |
|--------|-------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| FR-1   | The existing login page shall be restyled using Bootstrap while preserving all current authentication functionality from the boilerplate. | Must         |
| FR-2   | The restyled login form shall include username/email and password fields with Bootstrap form styling.                                     | Must         |
| FR-3   | Inline validation feedback (e.g. invalid credentials, empty fields) shall be displayed using Bootstrap alert/feedback components.         | Must         |
| FR-4   | On successful login, the user shall be redirected to the Team page.                                                                       | Must         |

## 4.1.1 Login Page Fields — Validation & Display Rules

| **Field**               | **Type**       | **Validation Rules**                                                                                                | **Display Rules**                                                                                                                            |
|-------------------------|----------------|---------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Username / Email        | Text input     | Required. Must not be empty on submit. Existing boilerplate validation logic (format/lookup) is unchanged.          | Bootstrap form-control styling. Shows a red border and inline error text below the field when empty or invalid on submit.                    |
| Password                | Password input | Required. Must not be empty on submit. Existing boilerplate validation logic (matching, length, etc.) is unchanged. | Bootstrap form-control styling, masked characters. Shows a red border and inline error text below the field when empty or invalid on submit. |
| Login button            | Submit button  | Disabled while a submit request is in flight to prevent double submission.                                          | Primary Bootstrap button, full width on mobile. Shows a small spinner while submitting.                                                      |
| Form-level error banner | Alert message  | Shown when the boilerplate's existing auth check returns invalid credentials or a server error.                     | Bootstrap alert-danger banner above the form fields, with a short human-readable message (e.g. "Incorrect username or password.").           |

## 4.2 Team Page

| **ID** | **Requirement**                                                                                                            | **Priority** |
|--------|----------------------------------------------------------------------------------------------------------------------------|--------------|
| FR-5   | The Team page shall be reachable only after a successful login, using the boilerplate's existing routing/session handling. | Must         |
| FR-6   | The Team page shall display the team name.                                                                                 | Must         |
| FR-7   | The Team page shall display each team member's photo, name, and role.                                                      | Must         |
| FR-8   | The Team page shall display a short blurb for each team member.                                                            | Must         |
| FR-9   | Team members shall be displayed using Bootstrap grid/card components, consistent with the login page's styling.            | Must         |
| FR-10  | A placeholder image shall be shown for any team member without a supplied photo.                                           | Could        |

## 4.2.1 Team Page Fields — Validation & Display Rules

| **Field**    | **Type**               | **Validation Rules**                                                                                           | **Display Rules**                                                                                                                     |
|--------------|------------------------|----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Team name    | Text (heading)         | Required. Must not be empty — falls back to a default placeholder title if unset.                              | Displayed as a page heading (Bootstrap display/heading utility classes) above the member grid.                                        |
| Member photo | Image                  | Optional per member. If missing or the image fails to load, a placeholder avatar is used (see Edge Case 3).    | Bootstrap card-img-top, fixed aspect ratio, object-fit: cover so photos don't distort.                               |
| Member name  | Text                   | Required per member. Member is not rendered if name is missing (treated as invalid data).                      | Bootstrap card-title styling, bold, truncates with ellipsis if it exceeds the card width.                                             |
| Member role  | Text                   | Required per member. Falls back to "Team Member" if not supplied.                                              | Bootstrap text-muted subtitle directly below the member name.                                                                         |
| Member blurb | Text (short paragraph) | Optional per member. Recommended max length communicated to content authors to keep cards visually consistent. | Bootstrap card-text styling. Long blurbs truncate with a 'read more' affordance rather than breaking the card grid (see Edge Case 4). |

# 5. Non-Functional Requirements

| **ID** | **Requirement**                                                                                                                   | **Priority** |
|--------|-----------------------------------------------------------------------------------------------------------------------------------|--------------|
| NFR-1  | Both pages shall use Bootstrap utility classes and components rather than large amounts of custom CSS.                            | Must         |
| NFR-2  | Pages shall render correctly on the latest versions of Chrome, Firefox, and Edge.                                                 | Must         |
| NFR-3  | The Team page shall load within 2 seconds on a standard broadband connection with the expected team size.                         | Should       |
| NFR-4  | No existing boilerplate functionality (routing, authentication, other pages) shall be broken by this sprint's changes.            | Must         |
| NFR-5  | Code shall follow the boilerplate's existing coding standards and folder structure for consistency with the rest of the codebase. | Must         |

# 6. User Stories & Acceptance Criteria

The functional requirements above are also expressed as user stories for
sprint planning purposes:

| **ID** | **User Story**                                                                                                                             | **Acceptance Criteria**                                                                                                                            |
|--------|--------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| US-1   | As a returning user, I want to log in through a clean, modern-looking form, so that the experience feels polished and trustworthy.         | Given I navigate to the login page, when it loads, then the form uses the new Bootstrap styling and matches the site's colour scheme.              |
| US-2   | As a user who enters incorrect login details, I want clear visual feedback, so that I understand what went wrong and how to fix it.        | Given I submit invalid credentials, when the form is processed, then a Bootstrap-styled error message appears next to the relevant field(s).       |
| US-3   | As a logged-in user, I want to land on a Team page after logging in, so that I can immediately see who is on the team.                     | Given I submit valid credentials, when login succeeds, then I am redirected to the Team page showing the team name.                                |
| US-4   | As a logged-in user, I want to see each team member's photo, name, role, and a short blurb, so that I can quickly understand who they are. | Given I am on the Team page, when it loads, then every team member is shown with a photo, name, role, and blurb.                                   |
| US-5   | As a user on a mobile phone, I want the Team page to be readable on my screen, so that I don't have to zoom or scroll sideways.            | Given I open the Team page on a mobile viewport, when the page renders, then team member cards stack in a single column and remain fully readable. |

## 6.1 Key Acceptance Criteria

The following criteria must all hold true for the feature to be
considered complete:

- Team page renders per design with all required fields.

- Successful login redirects to team page.

- Team page not directly accessible without login.

# 7. Edge Cases

The following edge cases have been identified and documented, along with
the expected behaviour for each:

| **\#** | **Edge Case**                                         | **Expected Behaviour**                                                                                                                  |
|--------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| 1      | Invalid login (incorrect username/email or password). | Form-level Bootstrap alert-danger banner is shown; password field is cleared, username/email is retained; user stays on the login page. |
| 2      | Direct team-page access without logging in.           | The boilerplate's existing route protection redirects the user back to the login page; the Team page is never rendered.                 |
| 3      | A team member has a missing photo.                    | A placeholder avatar image is shown in place of the missing photo (per FR-12).                                                          |
| 4      | A team member has an unusually long blurb.            | Card layout expands vertically or truncates with a 'read more' affordance, rather than breaking the grid layout.                        |

# 8. Assumptions

- The boilerplate already includes (or can add) Bootstrap without major
  dependency conflicts.

- Team member content (names, roles, photos, blurbs) will be supplied by
  the team before development starts.

- The boilerplate's existing login/auth logic and routing will remain
  functionally unchanged; this sprint focuses on styling and the
  post-login redirect/page.

# 9. Constraints

- Must be completed within the mock sprint's timeline.

- Must use Bootstrap (no other CSS frameworks) for styling these two
  pages.

- Must build on top of the existing boilerplate rather than replacing
  it.

- Must not break any existing functionality elsewhere on the site.

# 10. Definition of Done

- All Must-priority functional and non-functional requirements are
  implemented and demoed.

- Login to Team page flow works end-to-end and is tested on at least one
  desktop viewport.

- Code has been reviewed by at least one other team member before
  merging.

- No regressions in existing boilerplate functionality.

- All documented edge cases (Section 7) have been manually tested
  against the implementation.
