# WeHeat Lead Funnel Form

This is a multi-step lead generation form built with Next.js for WeHeat's heat pump savings calculator.

## Overview

This application collects user information about their property and heating system to generate personalized heat pump savings reports. The form includes:

- **Step 1**: Address/Location input with automatic address validation
- **Step 2**: Property details review (house type, build year, area, energy label, gas usage)
- **Step 3**: Insulation information (optional)
- **Step 4**: Heating system distribution
- **Step 5**: Contact information
- **Step 6**: Completion confirmation

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/forms](http://localhost:3000/forms) with your browser to see the form.

> **Note**: The application is deployed with a base path of `/forms` as configured in `next.config.ts`.

## Features

- Multi-step form with progress tracking
- Real-time address validation and enrichment
- Responsive design (mobile and desktop)
- Form data persistence across steps
- Input validation with error messages
- Conditional logic for heating system compatibility
- Confetti animation on completion

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: canvas-confetti

## Deployment

You can deploy your app by running:

```bash
webflow cloud deploy
```

See [Webflow Cloud documentation](https://developers.webflow.com/webflow-cloud/environment) for more details.