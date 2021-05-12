import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  TableBody,
} from "@material-ui/core";
import { useUserContext } from "../UserProvider";
import { withStyles } from "@material-ui/core/styles";

const TableCell = withStyles((theme) => ({
  root: {
    padding: "6px",
  },
}))(MuiTableCell);

export default function WordRankTable() {
  const { user } = useUserContext();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Word</b>
            </TableCell>
            <TableCell>
              <b>Frequency</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(user.word_rank)
            .sort(([key, value], [key2, value2]) => {
              return value2 - value;
            })
            .map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
