
import { useState } from 'react'

function App() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setMessage('')
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setMessage('Моля, изберете .dem файл!')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('demo', file)
    try {
      const res = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Файлът е качен успешно!')
      } else {
        setMessage(data.error || 'Грешка при качване!')
      }
    } catch (err) {
      setMessage('Грешка при връзка със сървъра!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">CS2 Demo Analyzer</h1>
        <form className="w-full flex flex-col items-center" onSubmit={handleUpload}>
          <input
            type="file"
            accept=".dem"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4 w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50 w-full"
          >
            {loading ? 'Качване...' : 'Качи .dem файл'}
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-gray-700 font-medium">{message}</div>
        )}
      </div>
    </div>
  )
}

export default App
