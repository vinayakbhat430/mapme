import {  useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
// import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import useRequest from "@/hooks/useRequest";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { selectedModel } from "@/hooks/eventSubject";
import { useToast } from "@/hooks/use-toast";

const DynamicDialogWithTable = () => {
  const {toast} = useToast()
  // Sample data array to dynamically populate the rows
  const [selectedOption, setSelectedOption] = useState('');
  const [tableData, setTableData] = useState<any>([]);
  const [open,setOpen] = useState<boolean>(false);

  const { errors, doRequest } = useRequest({
    url: "/api/anymodel",
    method: "GET",
    onSuccess: (d) => setTableData(d),
  });

  useEffect(() => {
    doRequest();
  }, []);

  const handleSelectChange = (selectedOption: string) => {
    setSelectedOption(e=> selectedOption);
  };

  const loadModel = () =>{
    const findSelected = tableData.find((d: { id: string; })=> d.id === selectedOption)
    if(findSelected){
        const subscription = selectedModel.next(findSelected)
    }
    setOpen(false);
    toast({
        title:'Map Loaded successfully'
    });
  }


  const handleClick = () =>{
    doRequest();
    setOpen(e=> !e)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} onClick={handleClick}>Show Saved Models</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saved Models</DialogTitle>
          <DialogDescription>List of all models saved previously!</DialogDescription>
        </DialogHeader>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Feature" />
          </SelectTrigger>
          <SelectContent className="relative">
            {tableData.map((data: { id: string; modelName: any }) => (
              <SelectItem value={data.id.toString()} key={data.id}>
                {data.modelName || data.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={loadModel}>Load</Button>
        <Button onClick={e=>setOpen(false)} variant={'destructive'}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicDialogWithTable;
