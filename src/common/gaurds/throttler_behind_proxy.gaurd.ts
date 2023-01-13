import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { request } from "http";
import { equal } from "joi";

@Injectable()
export class ThrottlerBehindProxyGaurd extends ThrottlerGuard {
    protected getTracker(req: Record<string, any>): string {
        return req.ips.length ? req.ips[0] : req.ip
    }
}