# Markdown Graphviz Preview

This is the Visual Studio Code Extension that allows you preview graphviz diagrams in your markdown file.

This extension take the [Viz.js](https://github.com/mdaines/viz-js) for inner Graphviz support.

## Usage

Firstly, install this extension in Visual Studio Code.

Let's start with a binary tree, draw it with graphviz dot engine. Then open a markdown and write such code block.

````markdown
```graphviz-dot
digraph BinaryTree {
    node [shape=circle];

    A -> B;
    A -> C;
    B -> D;
    B -> E;
    C -> F;
    C -> G;

    A [label="Root"];
    B [label="Left"];
    C [label="Right"];
    D [label="L1"];
    E [label="L2"];
    F [label="R1"];
    G [label="R2"];
}
```
````

It will render the diagram in markdown preview.
