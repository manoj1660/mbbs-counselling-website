"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading2, Heading3 } from 'lucide-react';

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Jab bhi text badlega, HTML parent ko milega
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      {/* --- TOOLBAR --- */}
      <div className="flex flex-wrap gap-2 p-2 bg-slate-50 border-b border-slate-200">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'hover:bg-slate-200'}`}><Bold size={16}/></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'hover:bg-slate-200'}`}><Italic size={16}/></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-600 text-white' : 'hover:bg-slate-200'}`}><UnderlineIcon size={16}/></button>
        <div className="w-px h-6 bg-slate-300 mx-1 self-center" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'hover:bg-slate-200'}`}><Heading2 size={16}/></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'hover:bg-slate-200'}`}><Heading3 size={16}/></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'hover:bg-slate-200'}`}><List size={16}/></button>
      </div>

      {/* --- EDITOR AREA --- */}
      <EditorContent editor={editor} className="p-4 min-h-[250px] focus:outline-none prose prose-sm max-w-none" />
    </div>
  );
};

export default TiptapEditor;