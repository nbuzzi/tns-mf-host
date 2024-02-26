const members = require("../jsons/members/members.json");

module.exports = {
  getConnectedMembers(acna, startAtRecord, recordsPerPage) {
    const membersFiltered = [];
    let memberAcnaQuantity = 0;

    for (const member of members) {
      const extractMember = member.members;

      for (const acnaMember of extractMember) {
        const acnaOfMember = acnaMember.acna;

        if (acnaOfMember === acna) {
          const memberValid = {
            acna: acnaMember.acna,
            knownAs: acnaMember.knownAs,
            memberConnectivityStatus: acnaMember.memberConnectivityStatus,
            devices: acnaMember.devices,
          };

          memberAcnaQuantity += 1;
          membersFiltered.push(memberValid);
        }
      }
    }

    const membersResultFiltered = membersFiltered.slice(
      startAtRecord,
      startAtRecord + recordsPerPage
    );

    const memberResponse = {
      totalRecords: members[0].members.length,
      returnedRecords: memberAcnaQuantity,
      members: membersResultFiltered,
    };

    return memberResponse;
  },

  exportConnectedMembers(startAtRecord, recordsPerPage) {
    const membersFiltered = [];
    let returnedQuantity = 0;

    for (const member of members) {
      const extractMember = member.members;

      for (const acnaMember of extractMember) {
        const memberAdd = {
          acna: acnaMember.acna,
          knownAs: acnaMember.knownAs,
          destMembers: acnaMember.destMembers,
        };

        returnedQuantity += 1;
        membersFiltered.push(memberAdd);
      }
    }

    const membersResultFiltered = membersFiltered.slice(
      startAtRecord,
      startAtRecord + recordsPerPage
    );

    const memberResponse = {
      totalRecords: members[0].members.length,
      returnedRecords: returnedQuantity,
      members: membersResultFiltered,
    };

    return memberResponse;
  },

  getMemberForGraph(acna) {
    let memberForGraph = null;

    for (const member of members) {
      const extractMember = member.members;

      for (const acnaMember of extractMember) {
        if (acnaMember.acna === acna) {
          memberForGraph = acnaMember.acnas;
        }
      }
    }

    return memberForGraph ? memberForGraph[0] : null;
  },

  getMemberConnectivity() {
    return memberConnectivity;
  },
};