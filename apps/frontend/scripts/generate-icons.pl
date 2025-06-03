#!/usr/bin/env perl
use strict;
use warnings;
use File::Basename;

my $input_file  = 'icon-list.txt';
my $output_file = 'icons.ts';

open my $in,  '<', $input_file  or die "Can't open $input_file: $!";
open my $out, '>', $output_file or die "Can't write $output_file: $!";

print $out "// Auto-generated – DO NOT EDIT\n\n";

my %used_names;
my @exports;

while (<$in>) {
    chomp;
    next unless $_;

    (my $import_path = $_) =~ s{^\./}{@/assets/icons/};

    my $filename = basename($_, '.svg');
    my @parts = split(/[-_]/, $filename);
    my $var = 'Icon'.join('', map { ucfirst lc } @parts) . '';

    # De-duplicate if same base name appears in different folders
    if ($used_names{$var}++) {
        my $unique_suffix = $used_names{$var};
        $var .= $unique_suffix;
    }

    print $out "import $var from '$import_path';\n";
    push @exports, "  $var,";
}

print $out "\nexport {\n", join("\n", @exports), "\n};\n";

close $in;
close $out;

print "✅ icons.ts generated successfully.\n";
