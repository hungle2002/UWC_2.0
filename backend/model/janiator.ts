//get all unassigned janiator in thang x tuan y
import * as data from './data'
import { Janiator } from './model'

function getUnassignedJan(month: number, week: number): Janiator[] {
    //get assigned list at specified time
    var assignedID: number[] = []
    data.JaniatorTaskList.forEach((task) => {
        if (task.month === month && task.week == week) {
            assignedID.push(task.janiatorID)
        }
    })
    var result: Janiator[] = []
    data.JaniatorList.forEach((jan) => {
        if (!assignedID.includes(jan.userID)) {
            result.push(jan)
        }
    })
    return result
}

function getJaniatorById(id: number): Janiator | null {
    let res: Janiator | null = null;
    for (let i = 0; i < data.JaniatorList.length; i++) {
        const tmp = data.JaniatorList[i];
        if (tmp.userID === id) {
            res = tmp;
        }
    }
    return res;
}

function getAssignedJanByMcpId(mcpId: number, month: number, week: number): Janiator[] {
    var assignedJan: Janiator[] = [];
    var tmpId: number[] = [];
    data.JaniatorTaskList.forEach((task) => {
        if (task.month === month && task.week == week && task.mcpID === mcpId) {
            tmpId.push(task.janiatorID);
        }
    })

    data.JaniatorList.forEach((janiator) => {
        if (tmpId.includes(janiator.userID)) {
            assignedJan.push(janiator);
        }
    })
    return assignedJan;
}

export { getUnassignedJan, getJaniatorById, getAssignedJanByMcpId }