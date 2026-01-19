import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to use the Indian Language Converter",
};

export default function DocsPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Documentation</h1>
          <p className="text-muted-foreground mt-2">
            Complete guide to using the Indian Language Converter - Built by Deepak Kamboj
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn the basics of converting text</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">How it Works</h3>
              <p className="text-gray-700">
                The Indian Language Converter uses phonetic transliteration to convert English text
                into Indian languages. Simply type the way the word sounds in English, and it will
                be converted to the target script.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Basic Usage</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Select your target language from the dropdown menu</li>
                <li>Type in the input box using English characters</li>
                <li>Watch the real-time conversion in the output box</li>
                <li>Copy the converted text using the Copy button</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Character Mapping</CardTitle>
            <CardDescription>Understanding the phonetic system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Vowels</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">a → अ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">aa, A → आ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">i → इ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">ii, I → ई</code>
                <code className="bg-gray-100 px-2 py-1 rounded">u → उ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">uu, U → ऊ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">e → ए</code>
                <code className="bg-gray-100 px-2 py-1 rounded">ai → ऐ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">o → ओ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">au → औ</code>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Consonants</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">k → क</code>
                <code className="bg-gray-100 px-2 py-1 rounded">kh → ख</code>
                <code className="bg-gray-100 px-2 py-1 rounded">g → ग</code>
                <code className="bg-gray-100 px-2 py-1 rounded">gh → घ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">ch → च</code>
                <code className="bg-gray-100 px-2 py-1 rounded">Ch → छ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">j → ज</code>
                <code className="bg-gray-100 px-2 py-1 rounded">jh → झ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">t → ट</code>
                <code className="bg-gray-100 px-2 py-1 rounded">T → ठ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">d → ड</code>
                <code className="bg-gray-100 px-2 py-1 rounded">D → ढ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">th → त</code>
                <code className="bg-gray-100 px-2 py-1 rounded">Th → थ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">dh → द</code>
                <code className="bg-gray-100 px-2 py-1 rounded">Dh → ध</code>
                <code className="bg-gray-100 px-2 py-1 rounded">n → न</code>
                <code className="bg-gray-100 px-2 py-1 rounded">p → प</code>
                <code className="bg-gray-100 px-2 py-1 rounded">ph → फ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">b → ब</code>
                <code className="bg-gray-100 px-2 py-1 rounded">bh → भ</code>
                <code className="bg-gray-100 px-2 py-1 rounded">m → म</code>
                <code className="bg-gray-100 px-2 py-1 rounded">y → य</code>
                <code className="bg-gray-100 px-2 py-1 rounded">r → र</code>
                <code className="bg-gray-100 px-2 py-1 rounded">l → ल</code>
                <code className="bg-gray-100 px-2 py-1 rounded">v → व</code>
                <code className="bg-gray-100 px-2 py-1 rounded">sh → श</code>
                <code className="bg-gray-100 px-2 py-1 rounded">Sh → ष</code>
                <code className="bg-gray-100 px-2 py-1 rounded">s → स</code>
                <code className="bg-gray-100 px-2 py-1 rounded">h → ह</code>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Special Characters</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">M → ं (Anusvara)</code>
                <code className="bg-gray-100 px-2 py-1 rounded">H, : → ः (Visarga)</code>
                <code className="bg-gray-100 px-2 py-1 rounded">* → ् (Halant/Virama)</code>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips & Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>
                  <strong>Capital letters matter:</strong> Use capital letters for aspirated consonants 
                  (e.g., "Th" for थ vs "th" for त)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>
                  <strong>Double vowels:</strong> Use double letters for long vowel sounds 
                  (e.g., "aa" for आ, "ii" for ई)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>
                  <strong>Special combinations:</strong> Learn special combinations like "nY" for ञ, 
                  "Sh" for ष
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>
                  <strong>Prevent conversion:</strong> Add a backtick (`) before any word to prevent 
                  it from being converted
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Examples</CardTitle>
            <CardDescription>Common phrases and their conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <code className="text-sm">namaste</code>
                <span className="text-xl">नमस्ते</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <code className="text-sm">dhanyavaadh</code>
                <span className="text-xl">धन्यवाद</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <code className="text-sm">aapka naam kya hai</code>
                <span className="text-xl">आपका नाम क्या है</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <code className="text-sm">bhaarath</code>
                <span className="text-xl">भारत</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About This Project</CardTitle>
            <CardDescription>Developer Information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-700">
              <p>
                This Indian Language Converter was built from scratch by <strong>Deepak Kamboj</strong> using modern web technologies.
              </p>
              <div className="flex flex-col gap-2">
                <p><strong>Developer:</strong> Deepak Kamboj</p>
                <p><strong>Email:</strong> <a href="mailto:deepakkamboj@gmail.com" className="text-indigo-600 hover:underline">deepakkamboj@gmail.com</a></p>
                <p><strong>GitHub:</strong> <a href="https://github.com/deepakkamboj" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">github.com/deepakkamboj</a></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
