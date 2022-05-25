import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SDK from "azure-devops-extension-sdk";
//{init, resize, ready, getConfiguration} from "azure-devops-extension-sdk";
import parse from 'html-react-parser'
//import { CommonServiceIds, IHostPageLayoutService } from "azure-devops-extension-api";
import * as Api from "azure-devops-extension-api"
import * as WI from "azure-devops-extension-api/WorkItemTracking";
import { query } from "express";

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


interface WorkItemProps {
    id: string,
    fields: [any]
}

const WorkItem = ({item}:{item:WorkItemProps | any}) => {
    return (
        <div>
            <div><h2>{item.fields['System.WorkItemType']} {item.id}: {item.fields['System.Title']}</h2></div>
            <div>{item.fields['System.Description'] && parse(item.fields['System.Description'])}</div>
            <div>{item.fields['Custom.RequirementCriteria'] && parse(item.fields['Custom.RequirementCriteria'])}</div>
            {/* <div><hr /><h3><i>Rationale Comments</i></h3></div> */}
            {/* <div>{item.fields['Custom.Rationale_Comments'] && parse(item.fields['Custom.Rationale_Comments'])}</div> */}
            
            {(item.relationships.length > 0)
            ? <div>
                <h3>Relationships</h3>
                <ul>
                {item.relationships.map((relItem:any) => {
                    return (
                        <li>
                                <h3>{relItem.fields['System.WorkItemType']} {relItem.id}: {relItem.fields['System.Title']}</h3>
                                <p>{relItem.fields['System.Description'] && parse(relItem.fields['System.Description'])}</p>
                        </li>
                    )
                })}
                </ul>
            </div>
            : <></>}
            <hr/>
        </div>
    )
}

export const Panel = () => {
    //return <div>Hello WOrld</div>
    const [workItems, setWorkItems] = React.useState<any>(null)

    React.useEffect( () => {
        console.log(SDK);
        SDK.init();
        
        //SDK.ready().then(async () => {
        SDK.ready().then(async () => {
            // The configuration contains the work items that were returned by the query 
            // const config = SDK.getConfiguration();
            const config = SDK.getConfiguration();
            const client = Api.getClient(WI.WorkItemTrackingRestClient)
            console.log(config)
            //const configurationItems = await client.queryByWiql({query: config.query.wiql}).then(result => {
            const configurationItems = await client.queryById(config.query.id).then(result => {
                console.log(`Query returned ${result.workItemRelations.length} items`)
                console.log(result)
                return (result.workItemRelations && result.workItemRelations) || []
                //return (result.workItems && result.workItems.map(wi => wi.id) ) || []
            })
            .then(async (queryWorkItems) => {
                if(queryWorkItems && queryWorkItems.length > 0) {
                    const itemCount = queryWorkItems.length
                    let batchIndex = 0
                    const batchSize = 200
                    const itemCache: {[key:number]: any}= {}

                    while (itemCount > batchIndex){
                        const batch = queryWorkItems.map(qWI => qWI.target.id).slice(batchIndex, batchIndex + batchSize)
                        const newItems = await client.getWorkItems(batch)

                        newItems.map(item => {
                            itemCache[item.id] = item
                        })
                        //itemCache.push(...newItems)
                        batchIndex += batchSize
                    }

                    const heirarchyList:{[key:number]: any} = {}

                    queryWorkItems.map(item => {
                        const {source, target} = item
                        if(source) {
                            if(heirarchyList[source.id]){
                                //const currentItem = heirarchyList[source.id]
                                heirarchyList[source.id].relationships.push(itemCache[target.id])
                            } else {
                                heirarchyList[source.id] = {relationships: [itemCache[target.id]]}
                            }
                        } else {
                            heirarchyList[target.id] = {...itemCache[target.id], relationships: []}
                        }
                    })
                    console.dir(heirarchyList)
                    setWorkItems(Object.values(heirarchyList))
                }
                
            });

            

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
                //SDK.resize(800, 800);
                SDK.resize(800, 800);
            }
        });

    }, [])

    if(!workItems) return <div>Loading ...</div>
    if(workItems.length < 1) return <div>Unable to Create Results </div>
    return (
        <div>
            <h1>Items</h1>
            <ul style={{listStyleType: 'none'}}>
                {workItems.map((item:any, index:number) => <li key={index}><WorkItem item={item} /></li>)}
            </ul>
        </div>
    )
}

export default Panel

//ReactDOM.render(<PanelContent />, document.getElementById("root"));