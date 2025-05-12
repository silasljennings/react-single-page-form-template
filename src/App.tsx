import './App.css'
import {StandardForm} from "@/components/standard-form.tsx";
import {Label} from "@/components/ui/label.tsx"

function App() {
  return (
    <>
        <Label className="mt-8 mb-8 flex justify-center text-lg">Please fill out the form and submit when complete</Label>
        <StandardForm/>
    </>
  )
}

export default App
