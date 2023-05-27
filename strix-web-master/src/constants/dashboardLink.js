class DashboardLink {
  static homeControlTemplate = '/dashboard/things/:thingId/home-control';

  static getHomeControl(thingId) {
    return `/dashboard/things/${thingId}/home-control`;
  }
}

export default DashboardLink;
