import * as vscode from "vscode";
import * as markdownIt from "markdown-it";
import { instance } from "@viz-js/viz";

const layoutEngines = [
	"dot",
	"neato",
	"fdp",
	"sfdp",
	"circo",
	"twopi",
	"nop",
	"nop2",
	"osage",
	"patchwork",
];

export async function activate(_context: vscode.ExtensionContext) {
	const viz = await instance();
	return {
		extendMarkdownIt(md: markdownIt) {
			const defaultFence = md.renderer.rules.fence;
			if (defaultFence == null) {
				return;
			}

			md.renderer.rules.fence = (tokens, idx, options, env, self) => {
				const token = tokens[idx];
				const lang = token.info.trim();

				let engine: string;

				if (layoutEngines.includes(lang)) {
					engine = lang;
				} else if (lang.match(/^graphviz-.+$/i)) {
					engine = lang.split("-")[1];
				} else if (lang === "graphviz") {
					engine = "dot";
				} else {
					return defaultFence(tokens, idx, options, env, self);
				}

				try {
					const renderedSVG = viz.renderString(token.content, {
						engine,
						format: "svg",
					});
					return `<figure class="graphviz">${renderedSVG}</figure>`;
				} catch (e: any) {
					return `<pre><code style="color:#F44336">${e.message}</code></pre>`;
				}
			};

			return md;
		},
	};
}

export function deactivate() {}
