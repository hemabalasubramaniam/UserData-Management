# Data Management System

A modern, configurable user management application built with Next.js, React, Redux Toolkit, and Formik. Features a clean interface for managing user records with expandable address details and form validation.

## Features

-  **CRUD Operations**: Add, edit, delete, and view user records
- **Configurable Features**: Enable/disable edit and delete functionality via config
- **Form Validation**: Robust validation using Yup schema
- **Dynamic Location Selection**: State-based city filtering
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **State Management**: Redux Toolkit for predictable state updates
- **Expandable Rows**: Toggle to view full address details
- **Customizable Validation**: Configure name length constraints

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Management**: Formik
- **Validation**: Yup
- **Language**: TypeScript

## Configuration

### `appConfig.ts`

Customize application behavior through the config file:

```typescript
{
  features: {
    editEnabled: true,      // Enable/disable edit functionality
    deleteEnabled: true,    // Enable/disable delete functionality
  },
  validation: {
    name: {
      minLength: 3,         // Minimum name length
      maxLength: 30,        // Maximum name length
    },
  },
}
```

### `masterData.json`

Add or modify available states and cities:

```json
{
  "states": [
    {
      "name": "State Name",
      "cities": ["City1", "City2", "City3"]
    }
  ]
}
```

## Data Model

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  linkedinUrl: string;
  gender: "Male" | "Female" | "Other";
  address: {
    line1: string;
    line2: string;
    state: string;
    city: string;
    pin: string;        // 6-digit PIN code
  };
}
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Usage

### Adding a User
1. Click the **ADD** button
2. Fill in all required fields (marked with *)
3. Select state (cities will populate automatically)
4. Enter 6-digit PIN code
5. Click **Add** to save

### Editing a User
1. Click **Edit** button on any user row
2. Modify the desired fields
3. Click **Update** to save changes

### Deleting a User
1. Click **Delete** button on any user row
2. Confirm the deletion in the prompt

### Viewing Address
1. Click the arrow icon (▶) to expand a row
2. Full address details will be displayed
3. Click again (▼) to collapse

## Validation Rules

- **Name**: 3-30 characters (configurable)
- **Email**: Valid email format required
- **LinkedIn URL**: Valid URL format required
- **Gender**: Must select one option
- **Address Line 1**: Required
- **Address Line 2**: Optional
- **State**: Must select from dropdown
- **City**: Must select from dropdown (populated based on state)
- **PIN Code**: Exactly 6 digits

## Features in Detail

### Configurable CRUD Operations
- Edit and delete buttons can be toggled via `appConfig`
- Actions column hides when both features are disabled
- Improves UI for read-only scenarios

### Dynamic City Population
- Cities automatically filter based on selected state
- City field disabled until state is selected
- Maintains data consistency

### Expandable Address View
- Clean table view with option to see full details
- Multiple rows can be expanded simultaneously
- Smooth toggle animation

### Form State Management
- Single form handles both add and edit operations
- Pre-populates data when editing
- Resets after successful submission

## Customization

### Adding New Fields
1. Update `User` interface in `userSlice.ts`
2. Add field to form in `RegistrationForm.tsx`
3. Update validation schema with Yup rules
4. Add column to table in `UserTable.tsx`

### Styling
- Modify Tailwind classes in components
- Update color scheme via Tailwind config
- Adjust spacing and layout as needed

## Dependencies

```json
{
  "react": "^18.0.0",
  "react-redux": "^8.0.0",
  "@reduxjs/toolkit": "^1.9.0",
  "formik": "^2.4.0",
  "yup": "^1.0.0",
  "next": "^14.0.0"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
