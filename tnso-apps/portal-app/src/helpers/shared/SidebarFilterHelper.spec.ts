import { SidebarFilterHelper } from "./SidebarFilterHelper";
import { ISidebarData } from "../../layouts/sidebars/sidebardata/SidebarData";

describe("SidebarFilterHelper", ()=>{
    it("Should filter the element 'child1' from the array 'parent1'", ()=>{
        const parentKey = "parent1";
        const childKey = "child1";
        const condition = false;
    
        const inputItems: ISidebarData[] = [
          {
            key: "parent1",
            label: "Parent 1",
            children: [
              { key: "child1", label: "Child 1", id:1, roles:[],href:"", icon:"" },
              { key: "child2", label: "Child 2",id:2, roles:[],href:"", icon:"" },
            ],
            id:1, roles:[],href:"", icon:""
          },
          {
            key: "parent2",
            label: "Parent 2",
            children: [
              { key: "child3", label: "Child 3", id:1, roles:[],href:"", icon:"" },
            ],
            id:2, roles:[],href:"", icon:""
          },
        ];
    
        const expectedOutput: ISidebarData[] = [
          {
            key: "parent1",
            label: "Parent 1",
            children: [
              { key: "child2", label: "Child 2", id:2, roles:[],href:"", icon:"" },
            ],
            id:1, roles:[],href:"", icon:""
          },
          {
            key: "parent2",
            label: "Parent 2",
            children: [
              { key: "child3", label: "Child 3", id:1, roles:[],href:"", icon:"" },
            ],
            id:2, roles:[],href:"", icon:""
          },
        ];
    
        const filteredItems = SidebarFilterHelper.filterMenu(inputItems, parentKey, childKey, condition);
        expect(filteredItems).toEqual(expectedOutput);
    });
    it("Should not filter the element 'child1' from the array 'parent1'", ()=>{
        const parentKey = "parent1";
        const childKey = "child1";
        const condition = true;
    
        const inputItems: ISidebarData[] = [
          {
            key: "parent1",
            label: "Parent 1",
            children: [
              { key: "child1", label: "Child 1", id:1, roles:[],href:"", icon:"" },
              { key: "child2", label: "Child 2",id:2, roles:[],href:"", icon:"" },
            ],
            id:1, roles:[],href:"", icon:""
          },
          {
            key: "parent2",
            label: "Parent 2",
            children: [
              { key: "child3", label: "Child 3", id:1, roles:[],href:"", icon:"" },
            ],
            id:2, roles:[],href:"", icon:""
          },
        ];
    
        const notExpectedOutput: ISidebarData[] = [
          {
            key: "parent1",
            label: "Parent 1",
            children: [
              { key: "child2", label: "Child 2", id:2, roles:[],href:"", icon:"" },
            ],
            id:1, roles:[],href:"", icon:""
          },
          {
            key: "parent2",
            label: "Parent 2",
            children: [
              { key: "child3", label: "Child 3", id:1, roles:[],href:"", icon:"" },
            ],
            id:2, roles:[],href:"", icon:""
          },
        ];
    
        const filteredItems = SidebarFilterHelper.filterMenu(inputItems, parentKey, childKey, condition);
        expect(filteredItems).not.toEqual(notExpectedOutput);
    });
})