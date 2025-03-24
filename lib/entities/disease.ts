/*
    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String procedure;
    */
export default interface Disease {
    id: number;
    name: string;
    description: string;
    procedure: string;
}