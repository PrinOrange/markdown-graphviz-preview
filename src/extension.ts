import * as vscode from "vscode";
import * as markdownIt from "markdown-it";
import { instance } from "@viz-js/viz";

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

				if (lang.match(/^graphviz-.+$/i)) {
					try {
						const engine = lang.match(/^graphviz-(.+)$/i)?.[1] || "dot";
						const renderedSVG = viz.renderString(token.content, {
							engine,
							format: "svg",
						});
						return `<figure class="graphviz">${renderedSVG}</figure>`;
					} catch (e: any) {
						return `<pre><code style="color:#F44336">${e.message}</code></pre>`;
					}
				}
				return defaultFence(tokens, idx, options, env, self);
			};

			return md;
		},
	};
}

export function deactivate() {}
