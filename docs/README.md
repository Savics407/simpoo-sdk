**@simpoobusiness/sdk v1.0.0**

***

# @simpoobusiness/sdk

A React-based SDK for embedding **Simpoo Business components** (like Inventory Table) into your application.

---

## 🚀 Installation

Install via npm or yarn:

```bash
npm install @simpoobusiness/sdk
# OR
yarn add @simpoobusiness/sdk
```

## ✅ Features

- 📊 Inventory Table Component – Display real-time inventory.

- 🔐 Secure API Calls – Uses your Simpoo API key.

- 🎨 Styled with Tailwind & Responsive UI.

- ⚡ Lightweight & Easy Integration.

## 📦 Usage

Import and use the SDK components in your React application:

Wrap your app with the **SimpooProvider** and pass your API key:

```jsx
import { SimpooProvider, InventoryTable } from "@simpoobusiness/sdk";

export default function App() {
  return (
    <SimpooProvider apiKey="YOUR_API_KEY">
      <div style={{ padding: "20px" }}>
        <h1>My Inventory</h1>
        <InventoryTable />
      </div>
    </SimpooProvider>
  );
}
```

> **Note:** Replace `YOUR_API_KEY` with your actual Simpoo Business API key.

## 🛠️ Available Components

- `InventoryTable`: Displays your business inventory.
- More components coming soon!

## ⚙️ Props

Each component may accept specific props. For example, `InventoryTable`:

| Prop   | Type   | Description                  |
| ------ | ------ | ---------------------------- |
| apiKey | string | Your Simpoo Business API key |

## 📖 Documentation

See the [official docs](https://simpoobusiness.com/docs/sdk) for more details and advanced usage.
