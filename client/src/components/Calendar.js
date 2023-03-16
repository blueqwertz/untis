import React, { useEffect, useState } from "react"
import axios from "../api/axios"

function Calendar() {
	const data = {
		20221219: {
			1: [{ status: "STANDARD", date: 20221219, hour: 1, start: 755, end: 845, teacher: "UND", room: "E06", subject: "M2", group: "1AM, 1AG", id: 1575775, subjectid: 60389, longnames: "Unger-Pones, Dagmar", info: "", group_show: "1AM, 1AG" }],
			2: [
				{ status: "STANDARD", date: 20221219, hour: 2, start: 850, end: 940, teacher: "FRE", room: "E06", subject: "RK", group: "1AM, 1AG", id: 1510459, subjectid: 59680, longnames: "Fr\u00e9d\u00e9riks, Birgit", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221219, hour: 2, start: 850, end: 940, teacher: "SAL", room: "104", subject: "RE", group: "1AM, 1AG, 1B, 1E", id: 1522989, subjectid: 59865, longnames: "Schubach, Alexander", info: "", group_show: "1AM, 1AG" },
				{ status: "ROOMSUBSTITUTION", date: 20221219, hour: 2, start: 850, end: 940, teacher: "GOM", room: "C12", subject: "NRA", group: "1AM, 1AG, 1B, 1E", id: 1658964, subjectid: 61430, longnames: "G\u00f6ller, Markus", info: "", group_show: "1AM, 1AG" },
			],
			3: [{ status: "STANDARD", date: 20221219, hour: 3, start: 955, end: 1045, teacher: "JE", room: "TS2", subject: "LUM", group: "1AM", id: 1577840, subjectid: 60404, longnames: "Jedli\u010dka, Ingrid", info: "", group_show: "1AM" }],
			4: [{ status: "STANDARD", date: 20221219, hour: 4, start: 1050, end: 1140, teacher: "JE", room: "TS2", subject: "LUM", group: "1AM", id: 1577845, subjectid: 60404, longnames: "Jedli\u010dka, Ingrid", info: "", group_show: "1AM" }],
			5: [{ status: "STANDARD", date: 20221219, hour: 5, start: 1145, end: 1235, teacher: "HM", room: "E06", subject: "MU4A", group: "1AM", id: 1343997, subjectid: 57074, longnames: "Hawranek, Martin", info: "", group_show: "1AM" }],
			6: [
				{ status: "STANDARD", date: 20221219, hour: 6, start: 1240, end: 1330, teacher: "MES", room: "E08", subject: "E1", group: "1AM, 1AG, 1B", id: 1525199, subjectid: 59905, longnames: "Mew, Steven", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221219, hour: 6, start: 1240, end: 1330, teacher: "OSN", room: "E06", subject: "E1", group: "1AM, 1AG, 1B", id: 1530492, subjectid: 59969, longnames: "Osterkorn, Nina", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221219, hour: 6, start: 1240, end: 1330, teacher: "ONJ", room: "E09", subject: "E1", group: "1AM, 1AG, 1B", id: 1531197, subjectid: 59974, longnames: "ONeill, Judith", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221219, hour: 6, start: 1330, end: 1400, teacher: "GRC", room: "", subject: "BFLZ", group: "1AM, 1AG, 1D", id: 1401812, subjectid: 57784, longnames: "Grubauer, Christoph", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221219, hour: 6, start: 1330, end: 1400, teacher: "PAT", room: "", subject: "BLZ", group: "1AM, 1AG, 1D", id: 1465077, subjectid: 58864, longnames: "Paier, Tamara", info: "", group_show: "1AM, 1AG" },
			],
			7: [
				{ status: "STANDARD", date: 20221219, hour: 7, start: 1400, end: 1450, teacher: "GRC", room: "", subject: "BFLZ", group: "1AM, 1AG, 1D", id: 1401817, subjectid: 57784, longnames: "Grubauer, Christoph", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221219, hour: 7, start: 1400, end: 1450, teacher: "ED", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C", id: 1405022, subjectid: 57819, longnames: "Eisenhut, Doris", info: "", group_show: "1AM, 1AG" },
			],
			8: [
				{ status: "SUBSTITUTION", date: 20221219, hour: 8, start: 1450, end: 1540, teacher: "HEB", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D", id: 1403987, subjectid: 57809, longnames: "Heidegger, Benjamin", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221219, hour: 8, start: 1450, end: 1540, teacher: "EBL", room: "", subject: "BLZ", group: "1AM, 1AG, 1C, 1D", id: 1467062, subjectid: 58894, longnames: "Ebert, Lukas", info: "", group_show: "1AM, 1AG" },
			],
			9: [{ status: "SUBSTITUTION", date: 20221219, hour: 9, start: 1550, end: 1640, teacher: "HEB", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D, 2AM, 2C, 2D", id: 1402902, subjectid: 57799, longnames: "Heidegger, Benjamin", info: "", group_show: "1AM, 1AG" }],
			10: [],
		},
		20221220: {
			1: [{ status: "STANDARD", date: 20221220, hour: 1, start: 755, end: 845, teacher: "HM", room: "MU1", subject: "CHOR", group: "1AM", id: 1405252, subjectid: 57834, longnames: "Hawranek, Martin", info: "", group_show: "1AM" }],
			2: [
				{ status: "STANDARD", date: 20221220, hour: 2, start: 850, end: 940, teacher: "FRE", room: "E06", subject: "RK", group: "1AM, 1AG", id: 1510464, subjectid: 59680, longnames: "Fr\u00e9d\u00e9riks, Birgit", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221220, hour: 2, start: 850, end: 940, teacher: "SAL", room: "105", subject: "RE", group: "1AM, 1AG, 1B, 1E", id: 1522994, subjectid: 59865, longnames: "Schubach, Alexander", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221220, hour: 2, start: 850, end: 940, teacher: "WFM", room: "E05", subject: "NRA", group: "1AM, 1AG, 1B, 1E", id: 1659124, subjectid: 61435, longnames: "Windhager-Fries, Mobeen", info: "", group_show: "1AM, 1AG" },
			],
			3: [{ status: "SUBSTITUTION", date: 20221220, hour: 3, start: 955, end: 1045, teacher: "GRP", room: "E06", subject: "D", group: "1AM, 1AG", id: 1561475, subjectid: 60249, longnames: "Gra\u00dfm\u00fcck, Philipp", info: "", group_show: "1AM, 1AG" }],
			4: [{ status: "STANDARD", date: 20221220, hour: 4, start: 1050, end: 1140, teacher: "JE", room: "TS2", subject: "LUM", group: "1AM", id: 1577850, subjectid: 60404, longnames: "Jedli\u010dka, Ingrid", info: "", group_show: "1AM" }],
			5: [{ status: "STANDARD", date: 20221220, hour: 5, start: 1145, end: 1235, teacher: "UND", room: "E06", subject: "M2", group: "1AM, 1AG", id: 1575780, subjectid: 60389, longnames: "Unger-Pones, Dagmar", info: "", group_show: "1AM, 1AG" }],
			6: [
				{ status: "ADDITIONAL", date: 20221220, hour: 6, start: 1240, end: 1330, teacher: "JUF", room: "E06", subject: "BMP", group: "1AM", id: 1766103, subjectid: 58764, longnames: "Juraszovich, Flora", info: "", group_show: "1AM" },
				{ status: "CANCEL", date: 20221220, hour: 6, start: 1330, end: 1400, teacher: "CEM", room: "E06", subject: "BMP", group: "1AM, 1AG", id: 1461652, subjectid: 58784, longnames: "Cernusca, Maria", info: "", group_show: "1AM, 1AG" },
				{ status: "ADDITIONAL", date: 20221220, hour: 6, start: 1330, end: 1400, teacher: "LUB", room: "E05", subject: "BLZ", group: "1AM", id: 1766095, subjectid: 66807, longnames: "Lux, Benjamin", info: "nur NaBe", group_show: "1AM" },
				{ status: "STANDARD", date: 20221220, hour: 6, start: 1240, end: 1330, teacher: "SCB", room: "E06", subject: "KVS", group: "1AM, 1AG", id: 1581085, subjectid: 60434, longnames: "Schwarz, Bettina", info: "", group_show: "1AM, 1AG" },
			],
			7: [
				{ status: "ADDITIONAL", date: 20221220, hour: 7, start: 1400, end: 1450, teacher: "LUB", room: "E05", subject: "BLZ", group: "1AM", id: 1766113, subjectid: 66808, longnames: "Lux, Benjamin", info: "", group_show: "1AM" },
				{ status: "CANCEL", date: 20221220, hour: 7, start: 1400, end: 1450, teacher: "REV", room: "TEX", subject: "TEC", group: "1AM", id: 1580640, subjectid: 60429, longnames: "Reich, Veronika", info: "", group_show: "1AM" },
			],
			8: [
				{ status: "ADDITIONAL", date: 20221220, hour: 8, start: 1450, end: 1540, teacher: "LUB", room: "E05", subject: "BLZ", group: "1AM", id: 1766118, subjectid: 66813, longnames: "Lux, Benjamin", info: "", group_show: "1AM" },
				{ status: "CANCEL", date: 20221220, hour: 8, start: 1450, end: 1540, teacher: "REV", room: "TEX", subject: "TEC", group: "1AM", id: 1580645, subjectid: 60429, longnames: "Reich, Veronika", info: "", group_show: "1AM" },
			],
			9: [
				{ status: "CANCEL", date: 20221220, hour: 9, start: 1550, end: 1640, teacher: "FOB", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D, 2AM, 2C, 2D", id: 1402907, subjectid: 57799, longnames: "F\u00f6rster, Bettina", info: "", group_show: "1AM, 1AG" },
				{ status: "ADDITIONAL", date: 20221220, hour: 9, start: 1550, end: 1640, teacher: "LUB", room: "", subject: "BLZ", group: "1AM, 1AG, 1C, 1D, 2AM, 2C, 2D", id: 1766075, subjectid: 58889, longnames: "Lux, Benjamin", info: "", group_show: "1AM, 1AG" },
			],
			10: [],
		},
		20221221: {
			1: [{ status: "STANDARD", date: 20221221, hour: 1, start: 755, end: 845, teacher: "UND", room: "E06", subject: "M2", group: "1AM, 1AG", id: 1575785, subjectid: 60389, longnames: "Unger-Pones, Dagmar", info: "", group_show: "1AM, 1AG" }],
			2: [
				{ status: "STANDARD", date: 20221221, hour: 2, start: 850, end: 940, teacher: "MES", room: "E08", subject: "E1", group: "1AM, 1AG, 1B", id: 1525204, subjectid: 59905, longnames: "Mew, Steven", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221221, hour: 2, start: 850, end: 940, teacher: "OSN", room: "E06", subject: "E1", group: "1AM, 1AG, 1B", id: 1530497, subjectid: 59969, longnames: "Osterkorn, Nina", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221221, hour: 2, start: 850, end: 940, teacher: "ONJ", room: "E09", subject: "E1", group: "1AM, 1AG, 1B", id: 1531202, subjectid: 59974, longnames: "ONeill, Judith", info: "", group_show: "1AM, 1AG" },
			],
			3: [{ status: "STANDARD", date: 20221221, hour: 3, start: 955, end: 1045, teacher: "SCB", room: "E06", subject: "D", group: "1AM, 1AG", id: 1561480, subjectid: 60249, longnames: "Schwarz, Bettina", info: "", group_show: "1AM, 1AG" }],
			4: [{ status: "STANDARD", date: 20221221, hour: 4, start: 1050, end: 1140, teacher: "STD", room: "E06", subject: "GWK", group: "1AM, 1AG", id: 1574765, subjectid: 60379, longnames: "Steinlechner, Diana", info: "", group_show: "1AM, 1AG" }],
			5: [{ status: "STANDARD", date: 20221221, hour: 5, start: 1145, end: 1235, teacher: "RAA", room: "E06", subject: "BIUK", group: "1AM, 1AG", id: 1576535, subjectid: 60394, longnames: "Radl, Alexandra", info: "", group_show: "1AM, 1AG" }],
			6: [
				{ status: "STANDARD", date: 20221221, hour: 6, start: 1240, end: 1330, teacher: "HM", room: "MU2", subject: "MU4A", group: "1AM", id: 1706005, subjectid: 57074, longnames: "Hawranek, Martin", info: "", group_show: "1AM" },
				{ status: "STANDARD", date: 20221221, hour: 6, start: 1330, end: 1400, teacher: "FI, ECA", room: "E06", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D", id: 1403992, subjectid: 57809, longnames: "Fichtenbauer, Christoph - Eisenreich, Caroline", info: "", group_show: "1AM, 1AG" },
			],
			7: [
				{ status: "STANDARD", date: 20221221, hour: 7, start: 1400, end: 1450, teacher: "GRN", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D", id: 1403997, subjectid: 57809, longnames: "Grosinger, Natalie", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221221, hour: 7, start: 1400, end: 1450, teacher: "ECA", room: "", subject: "BLZ", group: "1AM, 1AG, 1C, 1D", id: 1467067, subjectid: 58894, longnames: "Eisenreich, Caroline", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221221, hour: 7, start: 1400, end: 1450, teacher: "SCC", room: "", subject: "MKBS", group: "1AM, 1AG, 1C, 1D, 2C", id: 1495257, subjectid: 59294, longnames: "Schwarz, Constanze", info: "", group_show: "1AM, 1AG" },
			],
			8: [
				{ status: "STANDARD", date: 20221221, hour: 8, start: 1450, end: 1540, teacher: "SCC", room: "E51", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D", id: 1404002, subjectid: 57809, longnames: "Schwarz, Constanze", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221221, hour: 8, start: 1450, end: 1540, teacher: "NIH", room: "", subject: "BLZ", group: "1AM, 1AG, 1C, 1D", id: 1467072, subjectid: 58894, longnames: "Niedrist, Hannah", info: "", group_show: "1AM, 1AG" },
				{ status: "CANCEL", date: 20221221, hour: 8, start: 1450, end: 1540, teacher: "JUP", room: "", subject: "MKBS", group: "1AM, 1AG, 1C, 1D, 2C", id: 1495262, subjectid: 59294, longnames: "Jung, Philip", info: "", group_show: "1AM, 1AG" },
			],
			9: [{ status: "STANDARD", date: 20221221, hour: 9, start: 1550, end: 1640, teacher: "NIH", room: "", subject: "BLZ", group: "1AM, 1AG, 1C, 1D, 2AM, 2C, 2D", id: 1466677, subjectid: 58889, longnames: "Niedrist, Hannah", info: "", group_show: "1AM, 1AG" }],
			10: [],
		},
		20221222: {
			1: [
				{ status: "STANDARD", date: 20221222, hour: 1, start: 755, end: 845, teacher: "MES", room: "E05", subject: "E1", group: "1AM, 1AG, 1B", id: 1525209, subjectid: 59905, longnames: "Mew, Steven", info: "Adventgottesdienst", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221222, hour: 1, start: 755, end: 845, teacher: "OSN", room: "E06", subject: "E1", group: "1AM, 1AG, 1B", id: 1530502, subjectid: 59969, longnames: "Osterkorn, Nina", info: "Adventgottesdienst", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221222, hour: 1, start: 755, end: 845, teacher: "ONJ", room: "E09", subject: "E1", group: "1AM, 1AG, 1B", id: 1531207, subjectid: 59974, longnames: "ONeill, Judith", info: "Adventgottesdienst", group_show: "1AM, 1AG" },
			],
			2: [
				{ status: "STANDARD", date: 20221222, hour: 2, start: 850, end: 940, teacher: "MES", room: "E05", subject: "E1", group: "1AM, 1AG, 1B", id: 1525214, subjectid: 59905, longnames: "Mew, Steven", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221222, hour: 2, start: 850, end: 940, teacher: "OSN", room: "E06", subject: "E1", group: "1AM, 1AG, 1B", id: 1530507, subjectid: 59969, longnames: "Osterkorn, Nina", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221222, hour: 2, start: 850, end: 940, teacher: "ONJ", room: "E09", subject: "E1", group: "1AM, 1AG, 1B", id: 1531212, subjectid: 59974, longnames: "ONeill, Judith", info: "", group_show: "1AM, 1AG" },
			],
			3: [{ status: "STANDARD", date: 20221222, hour: 3, start: 955, end: 1045, teacher: "UND", room: "E06", subject: "M2", group: "1AM, 1AG", id: 1575790, subjectid: 60389, longnames: "Unger-Pones, Dagmar", info: "", group_show: "1AM, 1AG" }],
			4: [{ status: "STANDARD", date: 20221222, hour: 4, start: 1050, end: 1140, teacher: "RAA", room: "BU1", subject: "BIUK", group: "1AM, 1AG", id: 1576540, subjectid: 60394, longnames: "Radl, Alexandra", info: "", group_show: "1AM, 1AG" }],
			5: [{ status: "STANDARD", date: 20221222, hour: 5, start: 1145, end: 1235, teacher: "SU", room: "BE2", subject: "BE4A", group: "1AM", id: 1362257, subjectid: 57344, longnames: "Suske, Matthias", info: "", group_show: "1AM" }],
			6: [
				{ status: "STANDARD", date: 20221222, hour: 6, start: 1240, end: 1330, teacher: "SU", room: "BE2", subject: "BE4A", group: "1AM", id: 1362262, subjectid: 57344, longnames: "Suske, Matthias", info: "", group_show: "1AM" },
				{ status: "STANDARD", date: 20221222, hour: 6, start: 1330, end: 1400, teacher: "HM", room: "", subject: "BMP", group: "1AM", id: 1460402, subjectid: 58764, longnames: "Hawranek, Martin", info: "", group_show: "1AM" },
			],
			7: [{ status: "STANDARD", date: 20221222, hour: 7, start: 1400, end: 1450, teacher: "SU", room: "BE2", subject: "BE4A", group: "1AM", id: 1362267, subjectid: 57344, longnames: "Suske, Matthias", info: "", group_show: "1AM" }],
			8: [{ status: "STANDARD", date: 20221222, hour: 8, start: 1450, end: 1540, teacher: "HM", room: "MU1", subject: "MU4A", group: "1AM", id: 1344002, subjectid: 57074, longnames: "Hawranek, Martin", info: "", group_show: "1AM" }],
			9: [{ status: "STANDARD", date: 20221222, hour: 9, start: 1550, end: 1640, teacher: "GRN", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D, 2AM, 2C, 2D", id: 1402912, subjectid: 57799, longnames: "Grosinger, Natalie", info: "", group_show: "1AM, 1AG" }],
			10: [],
		},
		20221223: {
			1: [{ status: "STANDARD", date: 20221223, hour: 1, start: 755, end: 845, teacher: "SCB", room: "E06", subject: "D", group: "1AM, 1AG", id: 1561485, subjectid: 60249, longnames: "Schwarz, Bettina", info: "", group_show: "1AM, 1AG" }],
			2: [{ status: "STANDARD", date: 20221223, hour: 2, start: 850, end: 940, teacher: "SCB", room: "E06", subject: "D", group: "1AM, 1AG", id: 1561490, subjectid: 60249, longnames: "Schwarz, Bettina", info: "", group_show: "1AM, 1AG" }],
			3: [{ status: "STANDARD", date: 20221223, hour: 3, start: 955, end: 1045, teacher: "STD", room: "E06", subject: "GWK", group: "1AM, 1AG", id: 1574770, subjectid: 60379, longnames: "Steinlechner, Diana", info: "Bitte den Laptop aufgeladen mitbringen!", group_show: "1AM, 1AG" }],
			4: [{ status: "STANDARD", date: 20221223, hour: 4, start: 1050, end: 1140, teacher: "HM", room: "MU2", subject: "CHOR", group: "1AM", id: 1706170, subjectid: 57834, longnames: "Hawranek, Martin", info: "", group_show: "1AM" }],
			5: [{ status: "STANDARD", date: 20221223, hour: 5, start: 1145, end: 1235, teacher: "LUB", room: "", subject: "BLZ", group: "1AM, 1AG, 1D", id: 1689927, subjectid: 58864, longnames: "Lux, Benjamin", info: "", group_show: "1AM, 1AG" }],
			6: [
				{ status: "STANDARD", date: 20221223, hour: 6, start: 1330, end: 1400, teacher: "KOC", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D", id: 1404007, subjectid: 57809, longnames: "Koch, Andreas", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221223, hour: 6, start: 1240, end: 1330, teacher: "WFM", room: "", subject: "BFLZ", group: "1AM, 1AG, 1D, 2AM", id: 1688797, subjectid: 62563, longnames: "Windhager-Fries, Mobeen", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221223, hour: 6, start: 1330, end: 1400, teacher: "SEK", room: "", subject: "BLZ", group: "1AM, 1AG, 1C, 1D", id: 1467077, subjectid: 58894, longnames: "Sereda, Katharina", info: "", group_show: "1AM, 1AG" },
				{ status: "STANDARD", date: 20221223, hour: 6, start: 1240, end: 1330, teacher: "SEK", room: "", subject: "BLZ", group: "1AM, 1AG, 1D, 2AM", id: 1689762, subjectid: 62588, longnames: "Sereda, Katharina", info: "", group_show: "1AM, 1AG" },
			],
			7: [{ status: "STANDARD", date: 20221223, hour: 7, start: 1400, end: 1450, teacher: "KOC", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D", id: 1404012, subjectid: 57809, longnames: "Koch, Andreas", info: "", group_show: "1AM, 1AG" }],
			8: [{ status: "STANDARD", date: 20221223, hour: 8, start: 1450, end: 1540, teacher: "KOC", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D", id: 1404017, subjectid: 57809, longnames: "Koch, Andreas", info: "", group_show: "1AM, 1AG" }],
			9: [{ status: "STANDARD", date: 20221223, hour: 9, start: 1550, end: 1640, teacher: "KOC", room: "", subject: "BFLZ", group: "1AM, 1AG, 1C, 1D, 2AM, 2C, 2D", id: 1402917, subjectid: 57799, longnames: "Koch, Andreas", info: "", group_show: "1AM, 1AG" }],
			10: [],
		},
	}
	const [teacherData, setTeacherData] = useState({})

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get("/list")
			setTeacherData(response.data)
			console.log(response)
		}
		getData()
	}, [])

	const [dayView, setDayView] = useState(undefined)

	const formatDate = (dateInt) => {
		const year = Math.floor(dateInt / 10000)
		const month = Math.floor((dateInt % 10000) / 100)
		const day = dateInt % 100
		const date = new Date(year, month - 1, day)
		const weekday = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][date.getDay()]
		// const formattedDate = weekday + " " + (day < 10 ? "0" + day : day) + "." + (month < 10 ? "0" + month : month)
		return { weekday: weekday, date: (day < 10 ? "0" + day : day) + "." + (month < 10 ? "0" + month : month) }
	}

	return (
		<div className="flex grow">
			<div className="mt-[56px] sm:mt-[36px] flex flex-col px-2 pb-3 text-gray-400 dark:text-slate-500">
				<div className="grow flex justify-center items-center">1</div>
				<div className="grow flex justify-center items-center">2</div>
				<div className="grow flex justify-center items-center">3</div>
				<div className="grow flex justify-center items-center">4</div>
				<div className="grow flex justify-center items-center">5</div>
				<div className="grow flex justify-center items-center">6</div>
				<div className="grow flex justify-center items-center">7</div>
				<div className="grow flex justify-center items-center">8</div>
				<div className="grow flex justify-center items-center">9</div>
				<div className="grow flex justify-center items-center">10</div>
			</div>
			<div className="flex flex-1 gap-[1px] pr-3 pb-3 ">
				{/* DAY */}
				{Object.keys(data).map((day, index) => {
					const formDate = formatDate(day)
					return (
						<div className={`flex-1 grid grid-rows-[56px_repeat(10,1fr)] sm:grid-rows-[36px_repeat(10,1fr)] gap-[1px] ${dayView !== undefined && dayView !== index ? "hidden" : ""}`}>
							<div
								className="w-full py-1 flex flex-col sm:flex-row sm:gap-3 justify-center items-center text-sm md:text-base cursor-pointer select-none"
								onClick={async () => {
									await setDayView(dayView != undefined ? undefined : index)
									document.body.setAttribute("data-day-view", dayView == undefined)
								}}
							>
								<div className="font-semibold">{formDate.weekday}</div>
								<div>{formDate.date}</div>
							</div>
							{/* HOUR */}
							{Object.keys(data[day]).map((hour) => {
								return (
									<div data-hour className="flex-1 flex gap-[1px] bg-slate-300 dark:bg-slate-800 text-gray-900">
										{/* CLASS */}
										{Object.keys(data[day][hour]).map((hourclass) => {
											const curHour = data[day][hour][hourclass]
											return (
												<div className="flex-1 flex justify-center items-center" data-state={curHour["status"]}>
													<div className="w-full h-full text-sm flex justify-around items-center flex-col lg:flex-row text-center flex-wrap">
														<div className="flex flex-col justify-center items-center">
															<div className="italic font-semibold">{curHour["subject"]}</div>
															<div className="hover:underline cursor-pointer relative group">{curHour["teacher"]}</div>
														</div>
														<div className="flex flex-col justify-center items-center">
															<div>{curHour["room"]}</div>
															<div className="w-14 whitespace-nowrap overflow-hidden text-ellipsis ">{curHour["group"]}</div>
														</div>
													</div>
												</div>
											)
										})}
									</div>
								)
							})}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Calendar
