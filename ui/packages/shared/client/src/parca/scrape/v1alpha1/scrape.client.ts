// @generated by protobuf-ts 2.9.1 with parameter generate_dependencies
// @generated from protobuf file "parca/scrape/v1alpha1/scrape.proto" (package "parca.scrape.v1alpha1", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ScrapeService } from "./scrape";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { TargetsResponse } from "./scrape";
import type { TargetsRequest } from "./scrape";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * ScrapeService maintains the set of scrape targets
 *
 * @generated from protobuf service parca.scrape.v1alpha1.ScrapeService
 */
export interface IScrapeServiceClient {
    /**
     * Targets returns the set of scrape targets that are configured
     *
     * @generated from protobuf rpc: Targets(parca.scrape.v1alpha1.TargetsRequest) returns (parca.scrape.v1alpha1.TargetsResponse);
     */
    targets(input: TargetsRequest, options?: RpcOptions): UnaryCall<TargetsRequest, TargetsResponse>;
}
/**
 * ScrapeService maintains the set of scrape targets
 *
 * @generated from protobuf service parca.scrape.v1alpha1.ScrapeService
 */
export class ScrapeServiceClient implements IScrapeServiceClient, ServiceInfo {
    typeName = ScrapeService.typeName;
    methods = ScrapeService.methods;
    options = ScrapeService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * Targets returns the set of scrape targets that are configured
     *
     * @generated from protobuf rpc: Targets(parca.scrape.v1alpha1.TargetsRequest) returns (parca.scrape.v1alpha1.TargetsResponse);
     */
    targets(input: TargetsRequest, options?: RpcOptions): UnaryCall<TargetsRequest, TargetsResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<TargetsRequest, TargetsResponse>("unary", this._transport, method, opt, input);
    }
}
