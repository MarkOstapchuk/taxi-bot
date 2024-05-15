"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, __spreadArray([(new Date()).toString() + ' '], args, false));
}
function login(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.locator('input[name=login]').fill('fodreks')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.locator('input[name=password]').fill('gWCYJEZY8')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.locator('iframe[title=reCAPTCHA]').click()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.locator('.formRow.checkboxRow > label').click()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.locator('button[type=submit]').click()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function car(page, id, level, type) {
    return __awaiter(this, void 0, void 0, function () {
        var car, finishBtn, getOrderBtn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    car = page.locator("div[data-taxi-id=\"".concat(id, "\"]"));
                    finishBtn = car.locator('button.btn.btn-success.btn-block.finishOrder');
                    return [4 /*yield*/, finishBtn.isHidden()];
                case 1:
                    if (!!(_a.sent())) return [3 /*break*/, 3];
                    log('finished order on car ', id);
                    return [4 /*yield*/, finishBtn.click()
                        //await page.locator('button[type=button][data-dismiss=collapse].btn.btn-primary').click()
                    ];
                case 2:
                    _a.sent();
                    //await page.locator('button[type=button][data-dismiss=collapse].btn.btn-primary').click()
                    return [2 /*return*/];
                case 3:
                    getOrderBtn = car.locator('a[data-purpose=get-order]');
                    return [4 /*yield*/, getOrderBtn.isHidden()];
                case 4:
                    if (!!(_a.sent())) return [3 /*break*/, 7];
                    log('go to take order on ', id);
                    return [4 /*yield*/, getOrderBtn.click()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, takeOrder(page, level, type)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
                case 7:
                    log('no actions on', id);
                    return [2 /*return*/];
            }
        });
    });
}
function takeOrder(page, level, type) {
    return __awaiter(this, void 0, void 0, function () {
        var modal, checkReload, orders, _i, orders_1, order, carLevel, carType, flag, _a, _b, button, right, captcha, buttons, rand, closeBtn;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    modal = page.locator('.modal').locator('a.close.text-center');
                    return [4 /*yield*/, modal.isHidden()];
                case 1:
                    if (!!(_c.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, modal.click()];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    checkReload = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var reloadBlock, reloadOrders;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    reloadBlock = page.locator('div[data-container=orders-expired].orders-grid-row.row.animated.faster.flipInX');
                                    return [4 /*yield*/, reloadBlock.isHidden()];
                                case 1:
                                    if (!!(_a.sent())) return [3 /*break*/, 3];
                                    log('reload orders');
                                    reloadOrders = reloadBlock.locator('button.btn.btn-primary[data-reload-order=true]');
                                    return [4 /*yield*/, reloadOrders.click()];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }, 3000);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1000); })];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, page.locator('div.order').all()];
                case 5:
                    orders = _c.sent();
                    _i = 0, orders_1 = orders;
                    _c.label = 6;
                case 6:
                    if (!(_i < orders_1.length)) return [3 /*break*/, 28];
                    order = orders_1[_i];
                    return [4 /*yield*/, order.locator('.level-block').locator('span').innerText()];
                case 7:
                    carLevel = _c.sent();
                    return [4 /*yield*/, order.locator('.oParam.oType').innerText()];
                case 8:
                    carType = _c.sent();
                    if (!(carLevel.trim() === level.toString() && carType.trim() === type)) return [3 /*break*/, 27];
                    flag = true;
                    _c.label = 9;
                case 9:
                    if (!flag) return [3 /*break*/, 26];
                    _a = 0;
                    return [4 /*yield*/, order.locator('div.oBottom').locator('div.row-flex.align-items-center').locator('div').filter({ hasText: 'Взять заказ' }).all()];
                case 10:
                    _b = _c.sent();
                    _c.label = 11;
                case 11:
                    if (!(_a < _b.length)) return [3 /*break*/, 25];
                    button = _b[_a];
                    return [4 /*yield*/, button.evaluate(function (el) {
                            return window.getComputedStyle(el).getPropertyValue('right');
                        })];
                case 12:
                    right = _c.sent();
                    if (!(right !== '5px')) return [3 /*break*/, 24];
                    return [4 /*yield*/, button.locator('button').click()];
                case 13:
                    _c.sent();
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000); })];
                case 14:
                    _c.sent();
                    captcha = page.locator('div.captchaQuestion');
                    return [4 /*yield*/, captcha.isHidden()];
                case 15:
                    if (!!(_c.sent())) return [3 /*break*/, 23];
                    return [4 /*yield*/, captcha.locator('div.captchaAnswers').locator('button').all()];
                case 16:
                    buttons = _c.sent();
                    rand = Math.round(Math.random() * 3);
                    return [4 /*yield*/, buttons[rand].click()];
                case 17:
                    _c.sent();
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000); })];
                case 18:
                    _c.sent();
                    closeBtn = order.locator('button[type=button][data-dismiss=panel].btn-danger');
                    return [4 /*yield*/, closeBtn.isHidden()];
                case 19:
                    if (!!(_c.sent())) return [3 /*break*/, 21];
                    return [4 /*yield*/, closeBtn.click()];
                case 20:
                    _c.sent();
                    return [3 /*break*/, 22];
                case 21:
                    flag = false;
                    log('took order');
                    return [3 /*break*/, 25];
                case 22: return [3 /*break*/, 24];
                case 23:
                    flag = false;
                    return [3 /*break*/, 25];
                case 24:
                    _a++;
                    return [3 /*break*/, 11];
                case 25: return [3 /*break*/, 9];
                case 26: return [3 /*break*/, 28];
                case 27:
                    _i++;
                    return [3 /*break*/, 6];
                case 28:
                    clearInterval(checkReload);
                    return [2 /*return*/];
            }
        });
    });
}
function start(page, id, level) {
    return __awaiter(this, void 0, void 0, function () {
        var modal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.goto('https://www.taxi-polis.xyz/garage')];
                case 1:
                    _a.sent();
                    modal = page.locator('.modal').locator('a.close.text-center');
                    return [4 /*yield*/, modal.isHidden()];
                case 2:
                    if (!!(_a.sent())) return [3 /*break*/, 4];
                    return [4 /*yield*/, modal.click()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, car(page, id, level, 'ЭЛИТА')
                    //await car(page, '435484', 1)
                ];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function launchBrowser() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page1, page2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright_1.chromium.launchPersistentContext('/Users/mark/WebstormProjects/taxi-bot/context', {
                        headless: false,
                        slowMo: 50,
                        viewport: null
                    })];
                case 1:
                    browser = _a.sent();
                    log('browser open');
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page1 = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 3:
                    page2 = _a.sent();
                    return [4 /*yield*/, start(page1, '408134', 2)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, start(page2, '435484', 1)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page1.close()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page2.close()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 8:
                    _a.sent();
                    log('browser close');
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, launchBrowser()];
            case 1:
                _a.sent();
                setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, launchBrowser()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 120000
                //1200000
                );
                return [2 /*return*/];
        }
    });
}); })();
