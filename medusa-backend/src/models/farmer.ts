import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Farmer extends BaseEntity {
  @Index()
  @Column({ type: "varchar", nullable: true })
  user_id: string | null;

  @Column({ type: "varchar" })
  business_name: string;

  @Column({ type: "varchar" })
  contact_name: string;

  @Column({ type: "varchar" })
  phone: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  location: string;

  @Column({ type: "varchar", nullable: true })
  district: string | null;

  @Column({ type: "varchar", nullable: true })
  state: string | null;

  @Column({ type: "varchar", nullable: true })
  farm_size: string | null;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "varchar", default: "pending" })
  verification_status: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 10 })
  commission_rate: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  total_earnings: number;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown> | null;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "farmer");
  }
}
