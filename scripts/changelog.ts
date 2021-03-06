import { generateChangelog } from '@splish-me/changelog'
import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'

const writeFile = util.promisify(fs.writeFile)

exec().then(() => {})

async function exec(): Promise<void> {
  const content = await generateChangelog([
    {
      tagName: '0.1.0',
      date: '2019-02-08',
      description: 'Initial release'
    },
    {
      breakingChanges: [
        'The newly added `<Editor />` replaces the removed `<EditorProvider />`. It sets up the `EditorContext` and renders an editor for the given `state`.',
        "Don't export API that isn't intended for external usage anymore.",
        'Rename `createDocumentIdentifier` to `createDocument`'
      ],
      added: [
        'Handle serialization and deserialization of documents',
        'Add `<Editor />` that replaces `<EditorProvider />`'
      ],
      changed: ['Rename `createDocumentIdentifier` to `createDocument`'],
      removed: ['Remove `<EditorProvider />` in favor of `<Editor />`']
    }
  ])

  await writeFile(path.join(__dirname, '..', 'CHANGELOG.md'), content)
}
