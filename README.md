# Obsidian Copy-Paste Enhancer Plugin

### Implemented features:

1. Enhanced Numbered List Paste \
Paste should be performed through `Paste Numbered List` command. It continues numeration of 
existing list and matches indention level of previous line.

2. Copy Plain Markdown
Copying of selected text should be performed through `Copy Plain Markdown` command.
It copies plain markdown content of selected text into clipboard, `[[link to file]]` will be replaced with `[link to file](link to file)` format.
All `HTML` are kept unchanged.

3. `[in progress...]` Copy Structural Formatting Markdown
Copying of selected text should be performed through `Copy Only Structural Formatting` command.
It copies structural markdown content of selected text into clipboard, ignoring all text styles added with `HTML`.  
It allows to copy plain markdown structure of the selected text.
