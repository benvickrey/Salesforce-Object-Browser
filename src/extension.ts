// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "salesforce-object-browser" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	//let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');
	//});

	//context.subscriptions.push(disposable);
	
	if (vscode.workspace.getConfiguration('salesforce-object-browser').get('path') == "")
	{
		vscode.window.showInformationMessage('Please add the path of your your objects folder to settings.');
	}
	else
	{
		var p : any = vscode.workspace.getConfiguration('salesforce-object-browser').get('path');
		const OP = new objProvider(p);
		vscode.window.registerTreeDataProvider('objects', OP);
		vscode.commands.registerCommand('Extension.refresh', () =>  OP.refresh());
	}
}

export class objProvider implements vscode.TreeDataProvider<Obj> {

	private _onDidChangeTreeData: vscode.EventEmitter<Obj | undefined> = new vscode.EventEmitter<Obj | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Obj | undefined> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string) {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: Obj): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Obj): Thenable<Obj[]> {
		
		var names : Obj[] = [];
		if (element)
		{
			let fieldnames : string[] = fs.readdirSync(this.workspaceRoot + "/" + element.label + "/fields");
			fieldnames.forEach(e => {
				var newString = e.substring(0, e.length - 15)
				names.push(new Obj(newString,0));
			})
		}
		else
		{
			var objects : string[] = fs.readdirSync(this.workspaceRoot);
			objects.forEach(e => {
				names.push(new Obj(e,1));
			});
		}
		
		return Promise.resolve(names);
	}
}

export class Obj extends vscode.TreeItem 
{
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState
	){
		
		super(label, collapsibleState);
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
