"use strict";
const tickets = require("../jsons/changeTickets/tickets.json");

module.exports = {
  getAllTickets(recordsPerPage, startAtRecord) {
    let ticketsResult = tickets;
    ticketsResult = ticketsResult.slice(
      startAtRecord,
      startAtRecord + recordsPerPage
    );
    const ticketsResponse = {
      totalRecords: ticketsResult.length,
      returnedRecords: ticketsResult.length,
      changeTickets: ticketsResult,
    };
    return ticketsResponse;
  },

  getTicketByUsername(changeTicketId) {
    for (const ticket of tickets) {
      if (ticket.changeTicketId === changeTicketId) {
        return ticket.ticket_info;
      }
    }
    return null;
  },

  getTicketsForGraph(recordsPerPage, startAtRecord) {
    let ticketsResult = tickets;
    ticketsResult = ticketsResult.slice(
      startAtRecord,
      startAtRecord + recordsPerPage
    );

    const changeTickets = ticketsResult.map((ticket) => {
      return {
        changeTicketId: ticket.changeTicketId,
        statusOfChange: ticket.statusOfChange,
        changeStartTime: ticket.changeStartTime,
        deviceCount: ticket.deviceCount,
      };
    });

    const ticketsResponse = {
      totalRecords: ticketsResult.length,
      returnedRecords: ticketsResult.length,
      changeTickets: changeTickets,
    };

    return ticketsResponse;
  },

  getDeviceByUsername(changeTicketId) {
    const ticketInfoById = this.getTicketByUsername(changeTicketId);
    const devices = ticketInfoById ? ticketInfoById.devices : [];

    const devicesTicket = devices.map((device) => {
      return {
        tnsDeviceName: device.tnsDeviceName,
        customerDeviceName: device.customerDeviceName,
      };
    });

    return devicesTicket;
  },
};
