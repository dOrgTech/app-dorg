import { Box, Grid } from "@material-ui/core";
import React from "react";
import { MultiValueInput } from "../../components/input/MultiValueInput";
import { COLORS } from "../../utils/colors";

export const ProjectsTableFilters: React.FC = () => {
  return (
    <Box
      padding="16px"
      marginTop="16px"
      bgcolor={COLORS.blueGray["50"]}
      borderRadius="8px"
    >
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <MultiValueInput values={[]} label="clients" />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <MultiValueInput values={["UX/UI Design"]} label="seeking builders" />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <MultiValueInput values={["Active"]} label="status" />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <MultiValueInput
            values={["DeFi", "Bitcoin", "Collateral"]}
            label="tags"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
