import "es6-promise/auto";
import * as SDK from "azure-devops-extension-sdk";
import { CommonServiceIds, getClient, IHostPageLayoutService } from "azure-devops-extension-api";
import { WorkItemTrackingRestClient } from "azure-devops-extension-api/WorkItemTracking";

//const client = getClient(WorkItemTrackingRestClient)


SDK.register("myAction", () => {
    return {
        execute: async (context: any) => {
            // console.debug(context)

            
            const client = getClient(WorkItemTrackingRestClient)
            const workItems = await client.queryByWiql({query: context.query.wiql}).then(result => {
                return result.workItemRelations.map(wi => wi.target.id)
            })
            .then(wids => client.getWorkItems(wids));

            console.debug(workItems)
            const dialogSvc = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService);
            dialogSvc.openMessageDialog(`Complete`);
        }
    }
});

SDK.init();
