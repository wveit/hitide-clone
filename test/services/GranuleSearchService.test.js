import {
    extractFootprint,
    extractExtent,
    extractImageUrlObject,
} from "../../services/GranuleSearchService";

describe("extractFootprint()", () => {
    it("parses a footprint", () => {
        const granule = {
            umm: {
                SpatialExtent: {
                    HorizontalSpatialDomain: {
                        Geometry: {
                            GPolygons: [
                                {
                                    Boundary: {
                                        Points: [
                                            { Longitude: 10, Latitude: 10 },
                                            { Longitude: 10, Latitude: 20 },
                                            { Longitude: 20, Latitude: 20 },
                                            { Longitude: 10, Latitude: 10 },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        };

        const footprint = extractFootprint(granule);

        expect(footprint).toEqual(
            "MULTIPOLYGON(((10 10, 10 20, 20 20, 10 10)))"
        );
    });

    it("parses a double footprint", () => {
        const granule = {
            umm: {
                SpatialExtent: {
                    HorizontalSpatialDomain: {
                        Geometry: {
                            GPolygons: [
                                {
                                    Boundary: {
                                        Points: [
                                            { Longitude: 10, Latitude: 10 },
                                            { Longitude: 10, Latitude: 20 },
                                            { Longitude: 20, Latitude: 20 },
                                            { Longitude: 10, Latitude: 10 },
                                        ],
                                    },
                                },
                                {
                                    Boundary: {
                                        Points: [
                                            { Longitude: 10, Latitude: 10 },
                                            { Longitude: 10, Latitude: 20 },
                                            { Longitude: 20, Latitude: 20 },
                                            { Longitude: 10, Latitude: 10 },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        };

        const footprint = extractFootprint(granule);

        expect(footprint).toEqual(
            "MULTIPOLYGON(((10 10, 10 20, 20 20, 10 10), (10 10, 10 20, 20 20, 10 10)))"
        );
    });

    it("returns null if GPolygons[] is empty", () => {
        const granule = {
            umm: {
                SpatialExtent: {
                    HorizontalSpatialDomain: {
                        Geometry: {
                            GPolygons: [],
                        },
                    },
                },
            },
        };

        const footprint = extractFootprint(granule);

        expect(footprint).toBeNull();
    });

    it("returns null if GPolygons[] is not defined", () => {
        const granule = {};

        const footprint = extractFootprint(granule);

        expect(footprint).toBeNull();
    });
});

describe("extractExtent()", () => {
    it("extracts an extent", () => {
        const granule = {
            umm: {
                SpatialExtent: {
                    HorizontalSpatialDomain: {
                        Geometry: {
                            BoundingRectangles: [
                                {
                                    WestBoundingCoordinate: -180,
                                    SouthBoundingCoordinate: -90,
                                    EastBoundingCoordinate: 180,
                                    NorthBoundingCoordinate: 90,
                                },
                            ],
                        },
                    },
                },
            },
        };

        const extent = extractExtent(granule);
        expect(extent).toEqual(
            "POLYGON((-180 -90, 180 -90, 180 90, -180 90, -180 -90))"
        );
    });

    it("extracts a double extent", () => {
        const granule = {
            umm: {
                SpatialExtent: {
                    HorizontalSpatialDomain: {
                        Geometry: {
                            BoundingRectangles: [
                                {
                                    WestBoundingCoordinate: 150,
                                    SouthBoundingCoordinate: -90,
                                    EastBoundingCoordinate: 180,
                                    NorthBoundingCoordinate: 90,
                                },
                                {
                                    WestBoundingCoordinate: -180,
                                    SouthBoundingCoordinate: -90,
                                    EastBoundingCoordinate: -150,
                                    NorthBoundingCoordinate: 90,
                                },
                            ],
                        },
                    },
                },
            },
        };

        const extent = extractExtent(granule);
        expect(extent).toEqual(
            "POLYGON((-180 -90, 180 -90, 180 90, -180 90, -180 -90))"
        );
    });

    it("returns null if BoundingRectangles[] is empty", () => {
        const granule = {
            umm: {
                SpatialExtent: {
                    HorizontalSpatialDomain: {
                        Geometry: {
                            BoundingRectangles: [],
                        },
                    },
                },
            },
        };
        const extent = extractExtent(granule);
        expect(extent).toBeNull();
    });

    it("returns null if BoundingRectangles[] doesn't exist", () => {
        const granule = {};
        const extent = extractExtent(granule);
        expect(extent).toBeNull();
    });
});

describe("extractImageUrlObject()", () => {
    it("extracts image urls", () => {
        const granule = {
            umm: {
                RelatedUrls: [
                    {
                        URL: "https://url-a",
                        Type: "Not image url",
                    },
                    {
                        URL: "https://archive.podaac.earthdata.nasa.gov/podaac-ops-cumulus-public/MODIS_T-JPL-L2P-v2019.0/20220102235001-JPL-L2P_GHRSST-SSTskin-MODIS_T-D-v02.0-fv01.0.sea_surface_temperature.png",
                        Type: "GET RELATED VISUALIZATION",
                    },
                    {
                        URL: "https://url-c",
                    },
                    {
                        URL: "https://archive.podaac.earthdata.nasa.gov/podaac-ops-cumulus-public/MODIS_T-JPL-L2P-v2019.0/20220102235001-JPL-L2P_GHRSST-SSTskin-MODIS_T-D-v02.0-fv01.0.quality_level.png",
                        Type: "GET RELATED VISUALIZATION",
                    },
                ],
            },
        };

        const imageUrlObject = extractImageUrlObject(granule);

        expect(imageUrlObject).toEqual({
            sea_surface_temperature:
                "https://archive.podaac.earthdata.nasa.gov/podaac-ops-cumulus-public/MODIS_T-JPL-L2P-v2019.0/20220102235001-JPL-L2P_GHRSST-SSTskin-MODIS_T-D-v02.0-fv01.0.sea_surface_temperature.png",
            quality_level:
                "https://archive.podaac.earthdata.nasa.gov/podaac-ops-cumulus-public/MODIS_T-JPL-L2P-v2019.0/20220102235001-JPL-L2P_GHRSST-SSTskin-MODIS_T-D-v02.0-fv01.0.quality_level.png",
        });
    });
});
