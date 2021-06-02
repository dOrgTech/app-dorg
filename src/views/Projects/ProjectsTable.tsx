import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Project, ProjectStatus } from "../../store/reducers/projects/model";
import BadgerLogo from "../../assets/images/badger.png";
import AvatarImg from "../../assets/images/avatar.png";
import { AvatarGroup } from "../../components/avatar/AvatarGroup";
import { Avatar, Box, Typography } from "@material-ui/core";
import { COLORS } from "../../utils/colors";
import { ProjectStatusChip } from "./ProjectStatusChip";
import { ProjectsTableFilters } from "./ProjectsTableFilters";

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 24,
    borderRadius: 8,
    boxShadow: "0px 8px 16px -4px rgba(148, 163, 184, 0.25)",
    filter: "drop-shadow(0px 0px 2px rgba(148, 163, 184, 0.25))",
  },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: COLORS.blueGray["50"],
  },
  tableHeaderCell: {
    color: COLORS.blueGray["500"],
    fontWeight: 700,
  },
  logo: {
    width: 24,
  },
  projectTitle: {
    fontWeight: 700,
    marginLeft: 8,
  },
  totalInvoicedTitle: {
    fontWeight: 600,
    color: COLORS.blueGray["700"],
    fontSize: 14,
    marginLeft: 8,
  },
});

const rows: Project[] = [
  {
    name: "Badger DAO",
    logo: BadgerLogo,
    totalInvoiced: 55302,
    totalUnit: "xDAI",
    members: [AvatarImg, AvatarImg, AvatarImg, AvatarImg, AvatarImg, AvatarImg],
    status: ProjectStatus.ACTIVE,
  },
  {
    name: "Badger DAO",
    logo: BadgerLogo,
    totalInvoiced: 55302,
    totalUnit: "xDAI",
    members: [AvatarImg, AvatarImg],
    status: ProjectStatus.PENDING,
  },
];

export const ProjectsTable = () => {
  const classes = useStyles();

  return (
    <>
      <ProjectsTableFilters />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Project</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Total Invoiced
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Members</TableCell>
              <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <img className={classes.logo} src={row.logo} alt="logo" />
                    <Typography variant="h4" className={classes.projectTitle}>
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h4"
                    className={classes.totalInvoicedTitle}
                  >
                    {row.totalInvoiced} {row.totalUnit}
                  </Typography>
                </TableCell>
                <TableCell>
                  <AvatarGroup>
                    {row.members.map((member, index) => (
                      <Avatar src={member} key={index} alt="avatar" />
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell>
                  <ProjectStatusChip status={row.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
