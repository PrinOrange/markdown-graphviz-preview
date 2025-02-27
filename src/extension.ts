import * as vscode from "vscode";
import * as markdownIt from "markdown-it";
import { instance } from "@viz-js/viz";

export async function activate(_context: vscode.ExtensionContext) {
	const viz = await instance();
	return {
		extendMarkdownIt(md: markdownIt) {
			const oriHighlight = md.options.highlight;
			if (oriHighlight == null) {
				return oriHighlight;
			}
			md.options.highlight = (code, lang, attrs) => {
				if (lang && lang.match(/^graphviz-.+$/i)) {
					try {
						const engine = lang.match(/^graphviz-(.+)$/i)?.[1] || "dot";
						const renderedSVG = viz.renderString(code, {
							engine: engine,
							format: "svg",
						});
						return `<figure class="graphviz" style="all:unset;">${renderedSVG}</figure>`;
					} catch (e: any) {
						return `<pre><code style="color:#F44336">${e.message}</code></pre>`;
					}
				}
				return oriHighlight(code, lang, attrs);
			};
			return md;
		},
	};
}

export function deactivate() {}
