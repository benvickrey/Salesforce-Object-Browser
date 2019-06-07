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
	vscode.window.registerTreeDataProvider('objects', new objProvider());
}

export class objProvider implements vscode.TreeDataProvider<Obj> {

	private _onDidChangeTreeData: vscode.EventEmitter<Obj | undefined> = new vscode.EventEmitter<Obj | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Obj | undefined> = this._onDidChangeTreeData.event;

	constructor() {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: Obj): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Obj): Thenable<Obj[]> {
		
	
		return Promise.resolve( [new Obj('Test',1), new Obj('Test2',0)]);
		
		
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
