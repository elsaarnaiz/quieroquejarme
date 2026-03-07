import { getOfficialCongressCommissions, getOfficialSenateCommissions } from "../_lib/parliament";

export async function GET() {
  return Response.json({
    congress: getOfficialCongressCommissions(),
    senate: getOfficialSenateCommissions(),
    grounded: true,
  });
}
