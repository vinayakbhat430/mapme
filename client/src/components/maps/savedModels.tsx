import { Key, useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
} from "@radix-ui/react-select";

const DynamicDialogWithTable = () => {
  // Sample data array to dynamically populate the rows
  const [tableData, setTableData] = useState<any>([]);

  const { errors, doRequest } = useRequest({
    url: "/api/anymodel",
    method: "GET",
    onSuccess: (d) => setTableData(d),
  });

  useEffect(() => {
    doRequest();
  }, []);

  const handleSelectChange = (selectedOption: string) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Show Saved Models</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saved Models</DialogTitle>
        </DialogHeader>

        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length ? tableData.map((row:any) => (
              <TableRow key={row?.feature?.id}>
                <TableCell>{row.propreties?.modelName || row.features.id}</TableCell>
                <TableCell>
                  <Button>Load</Button>
                </TableCell>
              </TableRow>
            )):<TableCell className="text-red-500 text-3xl">No Data found</TableCell>}
          </TableBody>
        </Table> */}
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Feature" />
          </SelectTrigger>
          <SelectContent>
            {tableData.map((data: { id: string; name: any }) => (
              <SelectItem value={data.id} key={data.id}>
                Feature {data.name || data.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicDialogWithTable;
