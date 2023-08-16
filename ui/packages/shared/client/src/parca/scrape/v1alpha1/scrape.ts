// @generated by protobuf-ts 2.9.1 with parameter generate_dependencies
// @generated from protobuf file "parca/scrape/v1alpha1/scrape.proto" (package "parca.scrape.v1alpha1", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { LabelSet } from "../../profilestore/v1alpha1/profilestore";
/**
 * TargetsRequest contains the parameters for the set of targets to return
 *
 * @generated from protobuf message parca.scrape.v1alpha1.TargetsRequest
 */
export interface TargetsRequest {
    /**
     * state is the state of targets to returns
     *
     * @generated from protobuf field: parca.scrape.v1alpha1.TargetsRequest.State state = 1;
     */
    state: TargetsRequest_State;
}
/**
 * State represents the current state of a target
 *
 * @generated from protobuf enum parca.scrape.v1alpha1.TargetsRequest.State
 */
export enum TargetsRequest_State {
    /**
     * STATE_ANY_UNSPECIFIED unspecified
     *
     * @generated from protobuf enum value: STATE_ANY_UNSPECIFIED = 0;
     */
    ANY_UNSPECIFIED = 0,
    /**
     * STATE_ACTIVE target active state
     *
     * @generated from protobuf enum value: STATE_ACTIVE = 1;
     */
    ACTIVE = 1,
    /**
     * STATE_DROPPED target dropped state
     *
     * @generated from protobuf enum value: STATE_DROPPED = 2;
     */
    DROPPED = 2
}
/**
 * TargetsResponse is the set of targets for the given requested state
 *
 * @generated from protobuf message parca.scrape.v1alpha1.TargetsResponse
 */
export interface TargetsResponse {
    /**
     * targets is the mapping of targets
     *
     * @generated from protobuf field: map<string, parca.scrape.v1alpha1.Targets> targets = 1;
     */
    targets: {
        [key: string]: Targets;
    };
}
/**
 * Targets is a list of targets
 *
 * @generated from protobuf message parca.scrape.v1alpha1.Targets
 */
export interface Targets {
    /**
     * targets is a list of targets
     *
     * @generated from protobuf field: repeated parca.scrape.v1alpha1.Target targets = 1;
     */
    targets: Target[];
}
/**
 * Target is the scrape target representation
 *
 * @generated from protobuf message parca.scrape.v1alpha1.Target
 */
export interface Target {
    /**
     * discovered_labels are the set of labels for the target that have been discovered
     *
     * @generated from protobuf field: parca.profilestore.v1alpha1.LabelSet discovered_labels = 1;
     */
    discoveredLabels?: LabelSet;
    /**
     * labels are the set of labels given for the target
     *
     * @generated from protobuf field: parca.profilestore.v1alpha1.LabelSet labels = 2;
     */
    labels?: LabelSet;
    /**
     * last_error is the error message most recently received from a scrape attempt
     *
     * @generated from protobuf field: string last_error = 3;
     */
    lastError: string;
    /**
     * last_scrape is the time stamp the last scrape request was performed
     *
     * @generated from protobuf field: google.protobuf.Timestamp last_scrape = 4;
     */
    lastScrape?: Timestamp;
    /**
     * last_scrape_duration is the duration of the last scrape request
     *
     * @generated from protobuf field: google.protobuf.Duration last_scrape_duration = 5;
     */
    lastScrapeDuration?: Duration;
    /**
     * url is the url of the target
     *
     * @generated from protobuf field: string url = 6;
     */
    url: string;
    /**
     * health indicates the current health of the target
     *
     * @generated from protobuf field: parca.scrape.v1alpha1.Target.Health health = 7;
     */
    health: Target_Health;
}
/**
 * Health are the possible health values of a target
 *
 * @generated from protobuf enum parca.scrape.v1alpha1.Target.Health
 */
export enum Target_Health {
    /**
     * HEALTH_UNKNOWN_UNSPECIFIED unspecified
     *
     * @generated from protobuf enum value: HEALTH_UNKNOWN_UNSPECIFIED = 0;
     */
    UNKNOWN_UNSPECIFIED = 0,
    /**
     * HEALTH_GOOD healthy target
     *
     * @generated from protobuf enum value: HEALTH_GOOD = 1;
     */
    GOOD = 1,
    /**
     * HEALTH_BAD unhealthy target
     *
     * @generated from protobuf enum value: HEALTH_BAD = 2;
     */
    BAD = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class TargetsRequest$Type extends MessageType<TargetsRequest> {
    constructor() {
        super("parca.scrape.v1alpha1.TargetsRequest", [
            { no: 1, name: "state", kind: "enum", T: () => ["parca.scrape.v1alpha1.TargetsRequest.State", TargetsRequest_State, "STATE_"] }
        ]);
    }
    create(value?: PartialMessage<TargetsRequest>): TargetsRequest {
        const message = { state: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TargetsRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TargetsRequest): TargetsRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* parca.scrape.v1alpha1.TargetsRequest.State state */ 1:
                    message.state = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TargetsRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* parca.scrape.v1alpha1.TargetsRequest.State state = 1; */
        if (message.state !== 0)
            writer.tag(1, WireType.Varint).int32(message.state);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.scrape.v1alpha1.TargetsRequest
 */
export const TargetsRequest = new TargetsRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TargetsResponse$Type extends MessageType<TargetsResponse> {
    constructor() {
        super("parca.scrape.v1alpha1.TargetsResponse", [
            { no: 1, name: "targets", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => Targets } }
        ]);
    }
    create(value?: PartialMessage<TargetsResponse>): TargetsResponse {
        const message = { targets: {} };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TargetsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TargetsResponse): TargetsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, parca.scrape.v1alpha1.Targets> targets */ 1:
                    this.binaryReadMap1(message.targets, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    private binaryReadMap1(map: TargetsResponse["targets"], reader: IBinaryReader, options: BinaryReadOptions): void {
        let len = reader.uint32(), end = reader.pos + len, key: keyof TargetsResponse["targets"] | undefined, val: TargetsResponse["targets"][any] | undefined;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = Targets.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field parca.scrape.v1alpha1.TargetsResponse.targets");
            }
        }
        map[key ?? ""] = val ?? Targets.create();
    }
    internalBinaryWrite(message: TargetsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* map<string, parca.scrape.v1alpha1.Targets> targets = 1; */
        for (let k of Object.keys(message.targets)) {
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            Targets.internalBinaryWrite(message.targets[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.scrape.v1alpha1.TargetsResponse
 */
export const TargetsResponse = new TargetsResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Targets$Type extends MessageType<Targets> {
    constructor() {
        super("parca.scrape.v1alpha1.Targets", [
            { no: 1, name: "targets", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Target }
        ]);
    }
    create(value?: PartialMessage<Targets>): Targets {
        const message = { targets: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Targets>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Targets): Targets {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated parca.scrape.v1alpha1.Target targets */ 1:
                    message.targets.push(Target.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Targets, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated parca.scrape.v1alpha1.Target targets = 1; */
        for (let i = 0; i < message.targets.length; i++)
            Target.internalBinaryWrite(message.targets[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.scrape.v1alpha1.Targets
 */
export const Targets = new Targets$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Target$Type extends MessageType<Target> {
    constructor() {
        super("parca.scrape.v1alpha1.Target", [
            { no: 1, name: "discovered_labels", kind: "message", T: () => LabelSet },
            { no: 2, name: "labels", kind: "message", T: () => LabelSet },
            { no: 3, name: "last_error", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "last_scrape", kind: "message", T: () => Timestamp },
            { no: 5, name: "last_scrape_duration", kind: "message", T: () => Duration },
            { no: 6, name: "url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "health", kind: "enum", T: () => ["parca.scrape.v1alpha1.Target.Health", Target_Health, "HEALTH_"] }
        ]);
    }
    create(value?: PartialMessage<Target>): Target {
        const message = { lastError: "", url: "", health: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Target>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Target): Target {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* parca.profilestore.v1alpha1.LabelSet discovered_labels */ 1:
                    message.discoveredLabels = LabelSet.internalBinaryRead(reader, reader.uint32(), options, message.discoveredLabels);
                    break;
                case /* parca.profilestore.v1alpha1.LabelSet labels */ 2:
                    message.labels = LabelSet.internalBinaryRead(reader, reader.uint32(), options, message.labels);
                    break;
                case /* string last_error */ 3:
                    message.lastError = reader.string();
                    break;
                case /* google.protobuf.Timestamp last_scrape */ 4:
                    message.lastScrape = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.lastScrape);
                    break;
                case /* google.protobuf.Duration last_scrape_duration */ 5:
                    message.lastScrapeDuration = Duration.internalBinaryRead(reader, reader.uint32(), options, message.lastScrapeDuration);
                    break;
                case /* string url */ 6:
                    message.url = reader.string();
                    break;
                case /* parca.scrape.v1alpha1.Target.Health health */ 7:
                    message.health = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Target, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* parca.profilestore.v1alpha1.LabelSet discovered_labels = 1; */
        if (message.discoveredLabels)
            LabelSet.internalBinaryWrite(message.discoveredLabels, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* parca.profilestore.v1alpha1.LabelSet labels = 2; */
        if (message.labels)
            LabelSet.internalBinaryWrite(message.labels, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* string last_error = 3; */
        if (message.lastError !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.lastError);
        /* google.protobuf.Timestamp last_scrape = 4; */
        if (message.lastScrape)
            Timestamp.internalBinaryWrite(message.lastScrape, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* google.protobuf.Duration last_scrape_duration = 5; */
        if (message.lastScrapeDuration)
            Duration.internalBinaryWrite(message.lastScrapeDuration, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* string url = 6; */
        if (message.url !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.url);
        /* parca.scrape.v1alpha1.Target.Health health = 7; */
        if (message.health !== 0)
            writer.tag(7, WireType.Varint).int32(message.health);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parca.scrape.v1alpha1.Target
 */
export const Target = new Target$Type();
/**
 * @generated ServiceType for protobuf service parca.scrape.v1alpha1.ScrapeService
 */
export const ScrapeService = new ServiceType("parca.scrape.v1alpha1.ScrapeService", [
    { name: "Targets", options: { "google.api.http": { get: "/targets" } }, I: TargetsRequest, O: TargetsResponse }
]);
