import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SDK from "azure-devops-extension-sdk";
import parse from 'html-react-parser'
import { CommonServiceIds, getClient, IHostPageLayoutService } from "azure-devops-extension-api";
import { WorkItemTrackingRestClient } from "azure-devops-extension-api/WorkItemTracking";

// import { Button } from "azure-devops-ui/Button";
// import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
// import { Toggle } from "azure-devops-ui/Toggle";
// import { showRootComponent } from "../../Common";

// interface IPanelContentState {
//     message?: string;
//     toggleValue?: boolean;
//     ready?: boolean;
// }

// class PanelContent extends React.Component<{}, IPanelContentState> {
    
//     constructor(props: {}) {
//         super(props);
//         this.state = {};
//     }

//     public componentDidMount() {
//         SDK.init();
        
//         SDK.ready().then(() => {
//             const config = SDK.getConfiguration();
//             const message = config.message || "Custom dialog message";
//             const toggleValue = !!config.initialValue;

            
//             //this.setState({ message, toggleValue, ready: true });

//             if (config.dialog) {
//                 // Give the host frame the size of our dialog content so that the dialog can be sized appropriately.
//                 // This is the case where we know our content size and can explicitly provide it to SDK.resize. If our
//                 // size is dynamic, we have to make sure our frame is visible before calling SDK.resize() with no arguments.
//                 // In that case, we would instead do something like this:
//                 //
//                 // SDK.notifyLoadSucceeded().then(() => {
//                 //    // we are visible in this callback.
//                 //    SDK.resize();
//                 // });
//                 SDK.resize(400, 400);
//             }
//         });
//     }

//     public render(): JSX.Element {
//         const { message, ready, toggleValue } = this.state;

//         return (
//             <div className="sample-panel flex-column flex-grow">Hello Folks
//                 {/* <Toggle checked={toggleValue} text={message} disabled={!ready} onChange={(e, val) => this.setState({toggleValue: val})} />
//                 <div className="flex-grow flex-column flex-center justify-center" style={{ border: "1px solid #eee", margin: "10px 0" }}>
//                     Additional content placeholder
//                 </div>
//                 <ButtonGroup className="sample-panel-button-bar">
//                     <Button
//                         primary={true}
//                         text="OK"
//                         onClick={() => this.dismiss(true)}
//                     />
//                     <Button
//                         text="Cancel"
//                         onClick={() => this.dismiss(false)}
//                     />
//                 </ButtonGroup> */}
//             </div>
//         );
//     }

//     private dismiss(useValue: boolean) {
//         const result = useValue ? this.state.toggleValue : undefined;
//         const config = SDK.getConfiguration();
//         if (config.dialog) {
//             config.dialog.close(result);
//         }
//         else if (config.panel) {
//             config.panel.close(result);
//         }
//     }
// }

const WorkItem = ({item}) => {
    return (
        <div>
            <div><h2><span style={{fontWeight: 'bold'}}>{item.fields['System.WorkItemType']} {item.id}</span>: {item.fields['System.Title']}</h2></div>
            <hr/>
            <div>{item.fields['System.Description'] && parse(item.fields['System.Description'])}</div>
        </div>
    )
}

const PanelContent = () => {
    const [workItems, setWorkItems] = React.useState(null)

    React.useEffect( () => {
        SDK.init();
        
        SDK.ready().then(async () => {
            // The configuration contains the work items that were returned by the query 
            const config = SDK.getConfiguration();
            const client = getClient(WorkItemTrackingRestClient)
            const configurationItems = await client.queryByWiql({query: config.query.wiql}).then(result => {
                return (result.workItemRelations && result.workItemRelations.map(wi => wi.target.id)) || []
            })
            .then(wids => wids && wids.length > 0 ? client.getWorkItems(wids) : []);

            console.dir(configurationItems)
            setWorkItems(configurationItems)

            if (config.dialog) {
                // Give the host frame the size of our dialog content so that the dialog can be sized appropriately.
                // This is the case where we know our content size and can explicitly provide it to SDK.resize. If our
                // size is dynamic, we have to make sure our frame is visible before calling SDK.resize() with no arguments.
                // In that case, we would instead do something like this:
                //
                // SDK.notifyLoadSucceeded().then(() => {
                //    // we are visible in this callback.
                //    SDK.resize();
                // });
                SDK.resize(800, 800);
            }
        });

    }, [])

    if(!workItems) return <div>Loading ...</div>
    if(workItems.length < 1) return <div>Unable to Create Results </div>
    return (
        <div>
            <ul style={{listStyleType: 'none'}}>
                {workItems.map((item, index) => <li key={index}><WorkItem item={item} /></li>)}
            </ul>
        </div>
    )
}

ReactDOM.render(<PanelContent />, document.getElementById("root"));